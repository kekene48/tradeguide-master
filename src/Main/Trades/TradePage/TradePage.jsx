import React from "react";
import "./TradePage.scss";
import { AiOutlineSwap } from "react-icons/ai";
import { useRef, useState } from "react";
import Select from "react-select";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { useAccount } from "wagmi";
import Moralis from "moralis";
import Data from "../../../Data.json";

const TradePage = () => {
  let targetValue1 = useRef("Link");
  let targetValue2 = useRef("USDT");
  const [radio, setRadio] = useState(false);

  //web3 API call to get the wallet balance and list of tokens available
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);
  const { address } = useAccount();

  const handleSubmit = async () => {
    const chain = EvmChain.ETHEREUM;

    await Moralis.start({
      apiKey: process.env.REACT_APP_MORALIS_API,
    });

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      // address,
      address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      chain,
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

  // const { isDisconnected } = useAccount();
  // if (!isDisconnected) {
  //   handleSubmit();
  // }

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
          onClick={() => handleSubmit()}
        >
          Swap
        </button>
      </div>
    </>
  );
};

export default TradePage;
