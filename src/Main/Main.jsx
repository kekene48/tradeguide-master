import React from "react";
import Sidebar from "./Sidebar";
import Top from "./Top";
import "./main.scss";
import TradePage from "./Trades/TradePage/TradePage";
import Loader from "./Loader/Loading";
import { useAccount } from "wagmi";

const Main = () => {
  const { isConnecting } = useAccount();

  return (
    <>
      <Top />
      <div className="main">
        <Sidebar />
        {isConnecting ? <Loader /> : <TradePage />}
      </div>
    </>
  );
};

export default Main;
