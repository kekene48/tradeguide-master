import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import "./TopTrades.scss";
import "../../../bootstrap.min.css";
import Top from "../../Top";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineDash } from "react-icons/ai";
import { useParams } from "react-router-dom";
import {
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
} from "wagmi";
import { contractABI, contractAddress } from "../../../Utils/constants";
//import { readContract } from "viem/dist/types/actions/public/readContract";

const Index = () => {
  const { index } = useParams();
  const [addToUpkeep, setAddToUpkeep] = useState(0);
  const [pageData, setPageData] = useState({});
  const [_upkeepInfo, setUpkeepInfo] = useState({});
  const readContract = {
    abi: contractABI,
    address: contractAddress,
  };
  const { data, error } = useContractRead({
    ...readContract,
    functionName: "getATrade",
    args: [index],
  });
  const { data: upkeepInfo, error: upkeepError } = useContractRead({
    ...readContract,
    functionName: "getUpkeepInfo",
    args: [data],
  });
  const { config: addFunds, error: addFundsError } = usePrepareContractWrite({
    ...readContract,
    functionName: "addFundsByID",
    args: [data, addToUpkeep],
  });
  const { config, error: cancelError } = usePrepareContractWrite({
    ...readContract,
    functionName: "cancelUpkeepById",
    args: [data],
  });

  const { write: cancel } = useContractWrite(config);
  const { write } = useContractWrite(addFunds);
  const completeOrNot = () => {
    return Math.round(Math.random());
  };

  const icons = [
    <AiOutlineDash style={{ fontSize: "1.5rem" }} />,
    <FiCheckCircle style={{ color: "white", fontSize: "1.5rem" }} />,
  ];

  useEffect(() => {
    setPageData(data);
    setUpkeepInfo(upkeepInfo);
  }, []);

  return (
    <>
      <Top />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          transform: "translateY(5.6rem)",
        }}
      >
        <Sidebar />
        {data != undefined ? (
          <div className="topTrade_main">
            <div className="trade_info">
              <div className="trade_info-icon">
                <h1>Token</h1>
                <p>Ether</p>
              </div>
              <div className="trade_info-icon">
                <h1>Price</h1>
                <p>$1300</p>
              </div>
              <div className="trade_info-icon">
                <h1>SL</h1>
                <p>1233</p>
              </div>
              <div className="trade_info-icon">
                <h1>TP</h1>
                <p>3333</p>
              </div>
              <div className="trade_info-icon">
                <h1>P/L</h1>
                <p>3.5%</p>
              </div>
              <div className="trade_info-icon">
                <h1>Amount</h1>
                <p>4.28</p>
              </div>
              <div className="trade_info-icon">
                <h1>timestamp</h1>
                <p>1982353733</p>
              </div>
              <div className="trade_info-icon">
                <h1>State</h1>
                <p>{icons[completeOrNot()]}</p>
              </div>
            </div>
            <div className="automation_info">
              <div className="automation_info-icon">
                <h1>Upkeep ID</h1>
                <p>13144222222222882891</p>
              </div>
              <div className="automation_info-icon">
                <h1>Add Funds</h1>
                <input
                  type="text"
                  value={addToUpkeep}
                  onChange={(e) => setAddToUpkeep(e.target.value)}
                />
                <button className="btn-success" onClick={() => write?.()}>
                  ADD
                </button>
              </div>
              <div className="automation_info-icon">
                <h1>Cancel Trade</h1>
                <button className="btn-danger" onClick={() => cancel?.()}>
                  {" "}
                  Cancel{" "}
                </button>
              </div>
              <div className="automation_info-icon">
                <h1>Upkeep balance</h1>
                <p>1313145</p>
                <h3>Ether</h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="topTrade_main">
            <div className="trade_info">
              <div className="trade_info-icon">
                <h1>Token</h1>
                <p>{data.tokenBought}</p>
              </div>
              <div className="trade_info-icon">
                <h1>Price</h1>
                <p>{data.buyPrice}</p>
              </div>
              <div className="trade_info-icon">
                <h1>SL</h1>
                <p>{data.sl}</p>
              </div>
              <div className="trade_info-icon">
                <h1>TP</h1>
                <p>{data.tp}</p>
              </div>
              <div className="trade_info-icon">
                <h1>P/L</h1>
                <p>3.5%</p>
              </div>
              <div className="trade_info-icon">
                <h1>Amount</h1>
                <p>{data.amount}</p>
              </div>
              <div className="trade_info-icon">
                <h1>timestamp</h1>
                <p>{new Date(data.timestamp.toNumber() * 1000).toLocaleString()}</p>
              </div>
              <div className="trade_info-icon">
                <h1>State</h1>
                <p>{icons[data._tradeState]}</p>
              </div>
            </div>
            <div className="automation_info">
              <div className="automation_info-icon">
                <h1>Upkeep ID</h1>
                <p></p>
              </div>
              <div className="automation_info-icon">
                <h1>Add Funds</h1>
                <input
                  type="text"
                  value={addToUpkeep}
                  onChange={(e) => setAddToUpkeep(e.target.value)}
                />
                <button className="btn-success" onClick={() => write?.()}>
                  ADD
                </button>
              </div>
              <div className="automation_info-icon">
                <h1>Cancel Trade</h1>
                <button className="btn-danger" onClick={() => cancel?.()}>
                  {" "}
                  Cancel{" "}
                </button>
              </div>
              <div className="automation_info-icon">
                <h1>Upkeep balance</h1>
                <p>1313145</p>
                <h3>Ether</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
