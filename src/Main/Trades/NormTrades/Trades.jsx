import React from "react";
import Sidebar from "../../Sidebar";
import "./Trades.scss";

const Trades = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Trader Id</th>
            <th>Buy</th>
            <th>Sell</th>
            <th>Time</th>
            <th>P / L (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ether</td>
            <td>Cecelia Ahern</td>
            <td>1300</td>
            <td>1409</td>
            <td>1982353733</td>
            <td>3.5%</td>
          </tr>
          <tr>
            <td>Ether</td>
            <td>Cecelia Ahern</td>
            <td>1300</td>
            <td>1409</td>
            <td>1982353733</td>
            <td>3.5%</td>
          </tr>
          <tr>
            <td>Ether</td>
            <td>Cecelia Ahern</td>
            <td>1300</td>
            <td>1409</td>
            <td>1982353733</td>
            <td>3.5%</td>
          </tr>
          <tr>
            <td>Ether</td>
            <td>Cecelia Ahern</td>
            <td>1300</td>
            <td>1409</td>
            <td>1982353733</td>
            <td>3.5%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
