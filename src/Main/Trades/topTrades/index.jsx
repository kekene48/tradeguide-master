import React from "react";
import Sidebar from "../../Sidebar";
import "./TopTrades.scss";

import "../../../bootstrap.min.css";
import Top from "../../Top";

const Index = () => {
  return (
    <>
      <Top />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
        Top Trades
      </div>
    </>
  );
};

export default Index;
