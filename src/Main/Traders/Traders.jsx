import React from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import "./Traders.scss";
import Top from "../Top";

const Traders = () => {
  const walletAddress = "dc8g8347tq74echhe9hfhe9hwehh9f3h994hh93h4h739hkkjsjs";
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
            <tr>
              <td>
                <Link to="/profile">Cecelia Ahern</Link>
              </td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Cecelia Ahern</Link>
              </td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Cecelia Ahern</Link>
              </td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Cecelia Ahern</Link>
              </td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Cecelia Ahern</Link>
              </td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Cecelia Ahern</Link>
              </td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>Cecelia Ahern</td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>Cecelia Ahern</td>
              <td>${walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>Cecelia Ahern</td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>Cecelia Ahern</td>
              <td>{walletAddress}</td>
              <td>3.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Traders;
