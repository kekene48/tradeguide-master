import React from "react";
import { useRef } from "react";
import "./Top.scss";
import { AiOutlineSwap } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Top = () => {
  let targetValue1 = useRef("Link");
  let targetValue2 = useRef("USDT");

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

  return (
    <div className="top">
      <Link
        to="/"
        className="app__top"
        style={{ left: "-3rem", top: "-.5rem" }}
      >
        <div
          className="app__logo"
          style={{ width: "4rem", height: "4rem" }}
        ></div>
        <div className="app__title">Trade Guide</div>
      </Link>
      <div className="swap-1 swap-card">
        <input type="text" placeholder="0" />
        <div className="custom-select">
          <select
            id="custom-select-swap-1"
            onChange={(e) => handleChange(e)}
            ref={targetValue1}
          >
            <option value="LINK">Link</option>
            <option value="USDT">USDT</option>
            <option value="BITCOIN">Bitcoin</option>
            <option value="DOGE">Doge</option>
            <option value="ETHEREUM">Ethereurm</option>
          </select>
        </div>
      </div>
      <div className="icon">
        <AiOutlineSwap style={{ width: "2.5rem", height: "1.5rem" }} />
      </div>
      <div className="swap-2 swap-card">
        <input type="text" placeholder="0" />
        <div className="custom-select">
          <select
            id="custom-select-swap-2"
            onChange={(e) => handleChange(e)}
            ref={targetValue2}
          >
            <option value="LINK">Link</option>
            <option value="USDT">USDT</option>
            <option value="BITCOIN">Bitcoin</option>
            <option value="DOGE">Doge</option>
            <option value="ETHERERUM">Ethereurm</option>
          </select>
        </div>
      </div>
      <button
        className="btn btn-primary btn-lg top-btn"
        onClick={() => console.log("swap successful")}
      >
        Swap
      </button>
      <div style={{ }}>
       <ConnectButton/>
    </div>
    </div>
  );
};

export default Top;
