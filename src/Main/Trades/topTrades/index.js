import React from "react";
import Sidebar from "../../Sidebar";
import './TopTrades.scss'
import '../../../bootstrap.min.css'

const Index = () => {
  return (
      <>
        <div style={{ display: "flex", flexDirection: 'row' }}>
          <Sidebar />
        Top Trades
        </div>
      </>       
  );
};

export default Index;
