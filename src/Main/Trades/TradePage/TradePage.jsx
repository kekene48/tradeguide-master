import React, { useEffect } from "react";
import "./TradePage.scss";
import { AiOutlineSwap } from "react-icons/ai";
import { useRef, useState } from "react";
import Select from "react-select";
import { useAccount, useNetwork } from "wagmi";
import Moralis from "moralis";
import Data from "../../../Utils/Data.json";

import { ethers } from "ethers";

const TradePage = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  let targetValue1 = useRef("Link");
  let targetValue2 = useRef("USDT");
  const [radio, setRadio] = useState(false);

  //web3 API call to get the wallet balance and list of tokens available
  const [showResult, setShowResult] = useState(false);
  const [start, setStart] = useState(true);
  const [result, setResult] = useState([]);

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
      chain: ethers.toBeHex(chain.id).toString().replace("0x0", "0x"),
    });

    console.log(response.toJSON());
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

  const options2 = Data.map((token) => {
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
          <p>{token.price}</p>
        </div>
      ),
    };
  });

  //initialize the variables that would hold the coins
  let coinOne, coinTwo;

  const handleChange = (e) => {
    //if statement to know which option button is selected and store the names of the coins
    if (e.currentTarget.id === "custom-select-swap-1") {
      coinOne = targetValue1.current.value;
    }

    if (e.currentTarget.id === "custom-select-swap-2") {
      coinTwo = targetValue2.current.value;
    }

    return coinOne, coinTwo;
  };

  const handleClick = () => {
    setRadio(!radio);
  };

  useEffect(() => {
    if (isConnected) {
      handleSubmit();
    }
  }, [chain.id, isConnected]);

  return (
    <>
      <div className="swap">
        <div className="swap-1 swap-card">
          <input type="text" placeholder="0" />
          <div className="container">
            <div className="custom-select mt-5 m-auto w-75">
              <Select
                id="custom-select-swap-1"
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
