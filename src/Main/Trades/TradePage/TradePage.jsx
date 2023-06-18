import React, { useEffect } from "react";
import "./TradePage.scss";
import { AiOutlineSwap } from "react-icons/ai";
import { useRef, useState } from "react";
import Select from "react-select";
import { useAccount, useNetwork } from "wagmi";
import Moralis from "moralis";
import { abi } from "../../../Utils/erc20";
import { contractABI, contractAddress } from "../../../Utils/constants";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { Polybase } from "@polybase/client";
import { ethPersonalSignRecoverPublicKey } from "@polybase/eth";
import { Auth } from "@polybase/auth";
import { ethers } from "ethers";
import { dataSelect } from "../../../Utils/Data";

const auth = new Auth();

const db = new Polybase({
  defaultNamespace:
    "pk/0xeaff3acda3168f34b902292254edec6ef11cd57e7626fd9215ef88af76f1422fcd87f1977522d8518a7d5fe75981982f20f48eee8604a12d5806752bcb4e1780/TradeBuddy",
});

async function getPublicKey() {
  const msg = "Login with Chat";
  const sig = await auth.ethPersonalSign(msg);
  const publicKey = ethPersonalSignRecoverPublicKey(sig, msg);
  return "0x" + publicKey.slice(4);
}

const TradePage = () => {
  const { isConnected, address } = useAccount();
  let { chain } = useNetwork();
  const [showResult, setShowResult] = useState(false);
  const [start, setStart] = useState(true);
  const [result, setResult] = useState([]);
  const [buyAmount, setBuyAMount] = useState(0);
  const [tokenSell, setTokenSell] = useState({});
  const [tokenBuy, setTokenBuy] = useState({});
  const [_tokenAmount, setTokenAmount] = useState(0);
  const [tp, setTp] = useState(0);
  const [sl, setSl] = useState(0);
  const [isPublickey, setIsPublickey] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokenInPrice, setTokenTnPrice] = useState(0);
  const [tokenOutPrice, setTokenOutPrice] = useState(0);
  const [tradeId, setTradeId] = useState("");

  const { config: swapExact, error: swapError } = usePrepareContractWrite({
    abi: contractABI,
    address: contractAddress,
    functionName: "swapExactInputSingleAlone",
    args: [tokenSell.token_address, _tokenAmount, tokenBuy.address],
  });
  const { write } = useContractWrite(swapExact);
  const { config, error } = usePrepareContractWrite({
    abi: contractABI,
    address: contractAddress,
    functionName: "useTPandSL",
    args: [tp, sl, _tokenAmount, tokenSell.token_address, tokenBuy.address, tradeId],
  });

  const { config: approve, error: approveError } = usePrepareContractWrite({
    abi: abi,
    address: tokenSell,
    functionName: "approve",
    args: [contractAddress, _tokenAmount],
  });
  const { writeAsync: approveF } = useContractWrite(approve);

  const { data, isLoading } = useContractRead({
    abi: contractABI,
    address: contractAddress,
    functionName: "getPrice",
    args: [tokenPrice],
  });
  const { write: tpSL } = useContractWrite(config);

  let targetValue1 = useRef("Link");
  let targetValue2 = useRef("USDT");
  const [radio, setRadio] = useState(false);

  const addTrade = async () => {
    try {
      const timestamp = new Date.now();
      const id = ethers.utils.keccak256(timestamp, tp, sl, tokenBuy.address);
      setTradeId(id);
      const _tokenAmountOut = (tokenInPrice / tokenOutPrice) * _tokenAmount;
      const recordTrade = await db
        .collection("TradeLog")
        .create([
          id.toString(),
          tp,
          sl,
          db.collection("User").record(isPublickey),
          tokenOutPrice,
          tokenBuy.address,
          _tokenAmountOut,
          timestamp,
        ]);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    try {
      const publicKey = await getPublicKey();
      setIsPublickey(publicKey);
      const user = await db.collection("User").record(isPublickey).get();
      console.log("User", user);
    } catch (e) {
      console.log(e);
      const user = await db.collection("User").create([address, address]);
      console.log("User", user);
      console.log(e);
    }
  };

  //web3 API call to get the wallet balance and list of tokens available

  const moralis = async () => {
    try {
      if (start) {
        await Moralis.start({
          apiKey: process.env.REACT_APP_MORALIS_API,
        });

        setStart(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    await moralis();

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: address,
      chain: ethers.utils.hexValue(chain.id),
    });

    // console.log(response.toJSON());
    setResult(response.toJSON());
    setShowResult(true);
  };
  //End of web3 API call

  //options in the Select from wallet data call to get tokens and balances
  const options1 = result.map((token) => {
    console.log(token);
    //setTokenSell(token);
    return {
      value: token,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: ".5rem",
            borderRadius: "1rem",
          }}
        >
          <img
            src={token.logo !== "null" ? token.thumbnail : ""}
            alt="token"
            height="30px"
            width="30px"
          />
          <p>{token.name}</p>
        </div>
      ),
    };
  });
  const handleChange = (selectedOption) => {
    setTokenBuy(selectedOption.value);
    console.log(`Option selected:`, selectedOption.value);
  };
  const handleChange1 = (selectedOption) => {
    setTokenSell(selectedOption.value);
    console.log(`Option selected:`, selectedOption.value);
  };

  const options2 = dataSelect?.map((token) => {
    //setTokenBuy(token);
    return {
      value: token,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            borderRadius: "1rem",
          }}
        >
          <img alt="token" height="30px" width="30px" src={token.logo} />
          <p>{token.name}</p>
        </div>
      ),
    };
  });

  //initialize the variables that would hold the coins
  let coinOne, coinTwo, tokenAmount;
  const handleClick = () => {
    setRadio(!radio);
  };

  useEffect(() => {
    createUser();
    setTokenPrice(tokenSell.token_address);
    setTokenTnPrice(data);
    setTokenPrice(tokenBuy.address);
    setTokenOutPrice(data);

    if (isConnected) {
      handleSubmit();
    }
  }, [isConnected]);

  return (
    <>
      <div className="swap">
        <div className="swap-1 swap-card">
          <input
            type="text"
            placeholder="0"
            onChange={(e) => {
              tokenAmount = e.currentTarget.value;
              setTokenAmount(e.currentTarget.value);
            }}
          />
          <div className="container">
            <div className="custom-select mt-5 m-auto w-75">
              <Select
                id="custom-select-swap-1"
                onChange={handleChange1}
                //defaultValue={options1[1]}
                ref={targetValue1}
                options={options1}
              />
            </div>
          </div>
        </div>
        <div className="icon">
          <AiOutlineSwap style={{ width: "2.5rem", height: "1.5rem" }} />
        </div>
        <div className="swap-2 swap-card">
          <input
            type="text"
            placeholder="0"
            value={(tokenInPrice / tokenOutPrice) * _tokenAmount}
          />
          <div className="container">
            <div className="custom-select mt-5 m-auto w-75">
              <Select
                id="custom-select-swap-2"
                //defaultValue={options2[1]}
                onChange={handleChange}
                ref={targetValue2}
                options={options2}
              />
            </div>
          </div>
        </div>

        <div className="sltp">
          <div className="radio">
            <label htmlFor="SLTP">Select SL/TP</label>
            <input
              type="checkbox"
              name="SLTP"
              id="SLTP"
              onClick={() => handleClick()}
            />
          </div>

          {radio ? (
            <div className="swap_inputs">
              <div className="swap_input-ST">
                <input
                  type="number"
                  placeholder="STOP LOSS"
                  step="0.5"
                  value={sl}
                  onChange={(e) => setSl(e.currentTarget.value)}
                />
              </div>
              <div className="swap_input-TP">
                <input
                  type="number"
                  placeholder="TAKE PROFIT"
                  step="0.5"
                  value={tp}
                  onChange={(e) => setTp(e.currentTarget.value)}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {radio ? (
          <button
            className="btn btn-primary btn-lg top-btn"
            onClick={() => approveF(() => tpSL?.())}
          >
            Swap
          </button>
        ) : (
          <button
            className="btn btn-primary btn-lg top-btn"
            onClick={() => approveF(() => write?.())}
          >
            Swap
          </button>
        )}
      </div>
    </>
  );
};

export default TradePage;
