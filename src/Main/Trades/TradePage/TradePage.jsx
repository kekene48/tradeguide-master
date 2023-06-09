import React, { useEffect } from "react";
import "./TradePage.scss";
import { AiOutlineSwap } from "react-icons/ai";
import { useRef, useState } from "react";
import Select from "react-select";
import { useAccount, useNetwork } from "wagmi";
import Moralis from "moralis";
import { data } from "../../../Utils/Data";
import qs from "qs";
import { contractABI, contractAddress } from "../../../Utils/constants";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { utils } from "ethers";

const TradePage = () => {
  const { isConnected, address } = useAccount();
  let { chain } = useNetwork();
  const [showResult, setShowResult] = useState(false);
  const [start, setStart] = useState(true);
  const [result, setResult] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState(3);
  const [selectedValue2, setSelectedValue2] = useState(3);
  const [buyAmount, setBuyAMount] = useState(0);
  const [tokenSell, setTokenSell] = useState({});
  const [tokenBuy, setTokenBuy] = useState({});
  const [_tokenAmount, setTokenAmount] = useState(0);
  const [tp, setTp] = useState(0);
  const [sl, setSl] = useState(0);

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
    args: [tp, sl, _tokenAmount, tokenSell.token_address, tokenBuy.address],
  });
  const { write: tpSL } = useContractWrite(config);

  let targetValue1 = useRef("Link");
  let targetValue2 = useRef("USDT");
  const [radio, setRadio] = useState(false);

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
      chain: utils.hexValue(chain.id),
    });

    // console.log(response.toJSON());
    setResult(response.toJSON());
    setShowResult(true);
  };
  //End of web3 API call

  const getQuote = async (
    _tokenS,
    _tokenB,
    amount,
    sellDecimal,
    buyDecimal
  ) => {
    try {
      const params = {
        sellToken: _tokenS,
        buyToken: _tokenB,
        // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
        sellAmount: amount * 10 ** sellDecimal,
      };

      const headers = { "0x-api-key": process.env.REACT_APP_OXAPI_KEY };
      const response = await fetch(
        `https://mumbai.api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
        { headers }
      );
      console.log(await response.json());
      const result = await response.json();
      setBuyAMount(result.buyAmount / 10 ** buyDecimal);
      const _buyAmount = result.buyAmount / 10 ** buyDecimal;
      return _buyAmount;
    } catch (error) {
      console.log(error);
    }
  };

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

  const options2 = data.map((token) => {
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
              getQuote(
                tokenSell.token_address,
                tokenBuy.address,
                tokenAmount,
                tokenSell.decimals,
                tokenBuy.decimal
              );
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
          <input type="text" placeholder="0" value={buyAmount} />
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
            onClick={() => tpSL?.()}
          >
            Swap
          </button>
        ) : (
          <button
            className="btn btn-primary btn-lg top-btn"
            onClick={() => write?.()}
          >
            Swap
          </button>
        )}
      </div>
    </>
  );
};

export default TradePage;
