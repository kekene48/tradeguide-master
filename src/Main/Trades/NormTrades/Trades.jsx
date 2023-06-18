import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import "./Trades.scss";
import Top from "../../Top";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineDash } from "react-icons/ai";
import { contractABI, contractAddress } from "../../../Utils/constants";
import { trades } from "../../../Utils/Data";
import { useAccount, useContractRead } from "wagmi";
import { useNavigate, Link } from "react-router-dom";
import { Polybase } from "@polybase/client";
import {useCollection} from "@polybase/react"

const db = new Polybase({
  defaultNamespace: "pk/0xeaff3acda3168f34b902292254edec6ef11cd57e7626fd9215ef88af76f1422fcd87f1977522d8518a7d5fe75981982f20f48eee8604a12d5806752bcb4e1780/TradeBuddy",
});


const Trades = () => {
  

  const [tradeData, setTradeData] = useState([]);
  const completeOrNot = () => {
    return Math.round(Math.random());
  };

  const query = db.collection("TradeLog");
  const { data: tradedata, error, loading } = useCollection(query);
  console.log(tradedata?.data);
 // const Data = tradedata?.data;
  // const calculatepl = () => {

  // }

  const {
    data: tradesData,
    isLoading: tradeDataLoading,
    error: tradesDataError,
  } = useContractRead({
    abi: contractABI,
    address: contractAddress,
    functionName: "getTrades",
  });
  const structuredTradeData = tradesData?.map((trade) => ({
    timestamp: new Date(trade.timestamp.toNumber() * 1000).toLocaleString(),
    trader_id: trade.trader,
    token: trade.tokenBought,
    buy_price: trade.buyPrice,
    id: trade.index,
    sl_tp: `${trade.sl.toString()} / ${trade.tp.toString()}`,
    state: trade._tradeState,
    amount: trade.amount,
    upkeepId: trade.upkeepID,
  }));
  console.log(tradesData);
  //console.log(structuredTradeData)


  const icons = [
    <AiOutlineDash style={{ fontSize: "1.5rem" }} />,
    <FiCheckCircle style={{ color: "green", fontSize: "1.5rem" }} />,
  ];

  //if user disconnects, this takes them back to home page
  const { isDisconnected } = useAccount();
  const navigate = useNavigate();
  useEffect(() => {
    setTradeData(structuredTradeData);
    //setTradeData(tradesData)
    if (isDisconnected) {
      navigate("/");
    }
  }, [isDisconnected]);

  return (
    <>
      <Top />
      <div style={{ display: "flex", transform: "translateY(5.6rem)" }}>
        <Sidebar />
        <table className="styled-table">
          <thead>
            <tr>
              <th>N/B</th>
              <th>Time</th>
              <th>Trader Id</th>
              <th>Token</th>
              <th>Buy</th>
              <th>Amount</th>
              <th>SL/TP</th>
              <th>P / L (%)</th>
             
            </tr>
          </thead>

          {tradeData && (
            <tbody>
              {tradeData.reverse().map((trade) => (
                <tr>
                  <td>{trade.id}</td>
                  <td>{trade.timestamp}</td>
                  <td>
                    <Link to={`/toptrades/${trade.id}`}>{trade.trader_id}</Link>
                  </td>
                  <td>{trade.token}</td>
                  <td>{trade.buy_price}</td>
                  <td>{trade.amount}</td>
                  <td>{trade.sl_tp}</td>
                  <td>{trade.pl}%</td>
                </tr>
              ))}
            </tbody>
          )}
          <tbody>
            {trades.reverse().map((trade) => (
              <tr>
                <td>{trade.id}</td>
                <td>{trade.timestamp}</td>
                <td>
                  <Link to={`/toptrades/${trade.id}`}>{trade.trader_id}</Link>
                </td>
                <td>{trade.token}</td>
                <td>{trade.buy_price}</td>
                <td>{trade.amount}</td>
                <td>{trade.sl_tp}</td>
                <td>{trade.pl}%</td>
                <td>{icons[completeOrNot()]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Trades;
