import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Top from "./Top";
import "./main.scss";
import TradePage from "./Trades/TradePage/TradePage";
import Loader from "./Loader/Loading";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineDash } from "react-icons/ai";
import { trades } from "../Utils/Data";

const Main = () => {
  const { isConnecting, isDisconnected } = useAccount();
  const completeOrNot = () => {
    return Math.round(Math.random());
  };

  //if user disconnects, this takes them back to home page
  const navigate = useNavigate();
  useEffect(() => {
    if (isDisconnected) {
      navigate("/");
    }
  }, [isDisconnected]);

  const icons = [
    <AiOutlineDash style={{ fontSize: "1.5rem" }} />,
    <FiCheckCircle style={{ color: "green", fontSize: "1.5rem" }} />,
  ];

  return (
    <>
      <Top />
      <div className="main" style={{ transform: "translateY(5.6rem)" }}>
        <Sidebar />
        {isConnecting ? <Loader /> : <TradePage />}{" "}
      </div>
      <table
        className="styled-table"
        style={{
          position: "absolute",
          left: "23.9rem",
          top: "50rem",
          zIndex: "-1",
        }}
      >
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
    </>
  );
};

export default Main;
