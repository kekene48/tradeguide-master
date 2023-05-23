import React from "react";
import Sidebar from "../../Sidebar";
import "./Trades.scss";
import Top from "../../Top";

const Trades = () => {
  return (
    <>
      <Top />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <table className="styled-table">
          <thead>
            <tr>
              <th>N/B</th>
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
              <td>1</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Ether</td>
              <td>Cecelia Ahern</td>
              <td>1300</td>
              <td>1409</td>
              <td>1982353733</td>
              <td>3.5%</td>
            </tr>
            <tr>
              <td>10</td>
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
    </>
  );
};

export default Trades;
