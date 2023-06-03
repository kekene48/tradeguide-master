import React from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import "./Traders.scss";
import Top from "../Top";
import { traders } from "../../Utils/Data";

const Traders = () => {
  const walletAddress = "0xBB7478253fd85cCdAAB8927ab97E400C2f2c281e";

  //returns a random number within a range
  function randomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  return (
    <>
      <Top />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <table className="styled-table">
          <thead>
            <tr>
              <th>Trader Id</th>
              <th>Wallet Address</th>
              <th>P / L (%)</th>
            </tr>
          </thead>
          <tbody>
            {traders.map((trader) => (
              <tr>
                <td>
                  <Link to={`/profile/${walletAddress}`}>{trader.trader}</Link>
                </td>
                <td>{walletAddress}</td>
                <td>{randomNumber(82, 87)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Traders;
