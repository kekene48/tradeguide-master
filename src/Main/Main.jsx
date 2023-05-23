import React from "react";
import Sidebar from "./Sidebar";
import Top from "./Top";
import "./main.scss";
import TradePage from "./Trades/TradePage/TradePage";

const Main = () => {
  return (
    <>
      <Top />
      <div className="main">
        <Sidebar />
        <TradePage />
      </div>
    </>
  );
};

export default Main;
