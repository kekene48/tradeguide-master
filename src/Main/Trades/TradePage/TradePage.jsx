import React, { useEffect } from "react";
import "./TradePage.scss";
import { AiOutlineSwap } from "react-icons/ai";
import { useRef, useState } from "react";
import Select from "react-select";
import { useAccount, useNetwork } from "wagmi";
import Moralis from "moralis";
import { data } from "../../../Utils/Data";

import { utils } from "ethers";

const TradePage = () => {
  const { isConnected, address } = useAccount();
  let { chain } = useNetwork();

  let targetValue1 = useRef("Link");
  let targetValue2 = useRef("USDT");
  const [radio, setRadio] = useState(false);

  //web3 API call to get the wallet balance and list of tokens available
  const [showResult, setShowResult] = useState(false);
  const [start, setStart] = useState(true);
  const [result, setResult] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState(3);
  const [selectedValue2, setSelectedValue2] = useState(3);

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
      address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      chain: utils.hexValue(chain.id),
    });

    // console.log(response.toJSON());
    setResult(response.toJSON());
    setShowResult(true);
  };
  //End of web3 API call

  //options in the Select from wallet data call to get tokens and balances
  const options1 = result.map((token) => {
    console.log(token);
    return {
      value: token.name,
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
          <p>{(token.balance / 10 ** token.decimals).toFixed(2)}</p>
        </div>
      ),
    };
  });

  const options2 = data.map((token) => {
    return {
      value: token.name,
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
            onChange={(e) => (tokenAmount = e.currentTarget.value)}
          />
          <div className="container">
            <div className="custom-select mt-5 m-auto w-75">
              <Select
                id="custom-select-swap-1"
                onChange={(e) => {
                  setSelectedValue1(e.value);
                  coinOne = e.value;
                  console.log(coinOne);
                }}
                defaultValue={options1[1]}
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
          <input type="text" placeholder="0" />
          <div className="container">
            <div className="custom-select mt-5 m-auto w-75">
              <Select
                id="custom-select-swap-2"
                defaultValue={options2[1]}
                onChange={(e) => {
                  setSelectedValue2(e.value);
                  coinTwo = e.value;
                  console.log(coinTwo);
                }}
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
                <input type="number" placeholder="STOP LOSS" step="0.5" />
              </div>
              <div className="swap_input-TP">
                <input type="number" placeholder="TAKE PROFIT" step="0.5" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <button
          className="btn btn-primary btn-lg top-btn"
          onClick={() => console.log("swap successful")}
        >
          Swap
        </button>
      </div>
    </>
  );
};

export default TradePage;
