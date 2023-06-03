import React from "react";
import Sidebar from "../../Sidebar";
import "./Trades.scss";
import Top from "../../Top";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineDash } from "react-icons/ai";
//import { useTradeGuideContext } from "../../../request/provider";
import { trades } from "../../../Utils/Data";

const Trades = () => {
  // const { getTrades } = useTradeGuideContext();
  const completeOrNot = () => {
    return Math.round(Math.random());
  };

  const icons = [
    <AiOutlineDash style={{ fontSize: "1.5rem" }} />,
    <FiCheckCircle style={{ color: "green", fontSize: "1.5rem" }} />,
  ];

  return (
    <>
      <Top />
      <div style={{ display: "flex" }}>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr>
                <td>{trade.id}</td>
                <td>{trade.timestamp}</td>
                <td>{trade.trader_id}</td>
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
