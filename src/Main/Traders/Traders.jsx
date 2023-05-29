import React from "react";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import "./Traders.scss";
import Top from "../Top";

const Traders = () => {
  const walletAddress = "dc8g8347tq74echhe9hfhe9hwehh9f3h994hh93h4h739hkkjsjs";

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
            <tr>
              <td>
                <Link to="/profile">Sergey Nazarov</Link>
              </td>
              <td>{walletAddress}</td>
              <td>{randomNumber(82, 87)}%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Kemal El Moujahid</Link>
              </td>
              <td>{walletAddress}</td>
              <td>{randomNumber(77, 82)}%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Jeff Hasselman</Link>
              </td>
              <td>{walletAddress}</td>
              <td>{randomNumber(72, 77)}%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Brad Feinstein</Link>
              </td>
              <td>{walletAddress}</td>
              <td>{randomNumber(67, 72)}%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Patrick Collins</Link>
              </td>
              <td>{walletAddress}</td>
              <td>{randomNumber(64, 67)}%</td>
            </tr>
            <tr>
              <td>
                <Link to="/profile">Austin Griffith</Link>
              </td>
              <td>{walletAddress}</td>
              <td>{randomNumber(62, 64)}%</td>
            </tr>
            <tr>
              <td>Stefan Rust</td>
              <td>{walletAddress}</td>
              <td>{randomNumber(60, 62)}%</td>
            </tr>
            <tr>
              <td>Radek Sienkiewicz</td>
              <td>${walletAddress}</td>
              <td>{randomNumber(58, 60)}%</td>
            </tr>
            <tr>
              <td>Scott Dykstra</td>
              <td>{walletAddress}</td>
              <td>{randomNumber(56, 58)}%</td>
            </tr>
            <tr>
              <td>Ebru Engwal</td>
              <td>{walletAddress}</td>
              <td>{randomNumber(53, 56)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Traders;
