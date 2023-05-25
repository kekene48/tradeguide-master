import React from "react";
import "./TradePage.scss";
import { AiOutlineSwap } from "react-icons/ai";
import { useRef, useState } from "react";

const TradePage = () => {
  let targetValue1 = useRef("Link");
  let targetValue2 = useRef("USDT");
  const [radio, setRadio] = useState(false);
  // let radio = document.querySelector("#SLTP");

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

  return (
    <div className="swap">
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
              <input type="text" placeholder="STOP LOSS" />
            </div>
            <div className="swap_input-TP">
              <input type="text" placeholder="TAKE PROFIT" />
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
  );
};

export default TradePage;
