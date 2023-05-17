import React from "react";
import { useRef } from "react";
import "./Top.scss";

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
    </div>
  );
};

export default Top;
