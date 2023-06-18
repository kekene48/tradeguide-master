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
import { useCollection } from "@polybase/react";
import { Polybase } from "@polybase/client";
//import { readContract } from "viem/dist/types/actions/public/readContract";

const db = new Polybase({
  defaultNamespace:
    "pk/0xeaff3acda3168f34b902292254edec6ef11cd57e7626fd9215ef88af76f1422fcd87f1977522d8518a7d5fe75981982f20f48eee8604a12d5806752bcb4e1780/TradeBuddy",
});

const Index = () => {
  const { index } = useParams();
  const [addToUpkeep, setAddToUpkeep] = useState(0);
  const [pageData, setPageData] = useState({});
  const [_upkeepInfo, setUpkeepInfo] = useState({});
  const [userAddress, setUserAddress] = useState("");
  const readContract = {
    abi: contractABI,
    address: contractAddress,
  };

  const query = db.collection("TradeLog").record(index.toString());
  const { data: tradedata, error, loading } = useCollection(query);
  console.log(tradedata?.data);

  const { data: upkeepInfo, error: upkeepError } = useContractRead({
    ...readContract,
    functionName: "getUpkeepInfo",
    args: [index],
  });
  const { config: addFunds, error: addFundsError } = usePrepareContractWrite({
    ...readContract,
    functionName: "addFundsByID",
    args: [index, addToUpkeep],
  });
  const { config, error: cancelError } = usePrepareContractWrite({
    ...readContract,
    functionName: "cancelUpkeepById",
    args: [index],
  });
  console.log(upkeepInfo);

  const { write: cancel } = useContractWrite(config);
  const { write } = useContractWrite(addFunds);
  const completeOrNot = () => {
    return Math.round(Math.random());
  };

  const getAddress = async (userId) => {
    const _getAddress = await db.collection("User").record(userId).get();
    setUserAddress(_getAddress.data.address);
  };

  const icons = [
    <AiOutlineDash style={{ fontSize: "1.5rem" }} />,
    <FiCheckCircle style={{ color: "white", fontSize: "1.5rem" }} />,
  ];

  useEffect(() => {
    setPageData(tradedata?.data);
    getAddress(tradedata?.data.trader_id.id);
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
        {pageData == undefined ? (
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
                <p>12882891</p>
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
                <p>LINK</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="topTrade_main">
            <div className="trade_info">
              <div className="trade_info-icon">
                <h1>Token</h1>
                <p>{pageData.token}</p>
              </div>
              <div className="trade_info-icon">
                <h1>Price</h1>
                <p>{pageData.buyPrice}</p>
              </div>
              <div className="trade_info-icon">
                <h1>SL</h1>
                <p>{pageData.sl}</p>
              </div>
              <div className="trade_info-icon">
                <h1>TP</h1>
                <p>{pageData.tp}</p>
              </div>
              <div className="trade_info-icon">
                <h1>P/L</h1>
                <p>3.5%</p>
              </div>
              <div className="trade_info-icon">
                <h1>Amount</h1>
                <p>{pageData.amount}</p>
              </div>
              <div className="trade_info-icon">
                <h1>timestamp</h1>
                <p>
                  {new Date(
                    pageData.timestamp.toNumber() * 1000
                  ).toLocaleString()}
                </p>
              </div>
              <div className="trade_info-icon">
                <h1>State</h1>
                <p>{icons[pageData.state]}</p>
              </div>
            </div>
            <div className="automation_info">
              <div className="automation_info-icon">
                <h1>Upkeep ID</h1>
                <p>{pageData.upKeepId}</p>
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
                <p>{upkeepInfo}</p>
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
