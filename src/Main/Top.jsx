import React from "react";
import "./Top.scss";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../assets/profile.png";

const Top = () => {
  return (
    <div className="top">
      <Link
        to="/"
        className="app__top"
        style={{ left: "-8rem", top: "-.5rem" }}
      >
        <img
          src={Logo}
          alt="TradeXp"
          style={{ width: "15rem", height: "9rem" }}
        />
      </Link>
      <div style={{}}>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Top;
