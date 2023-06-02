import React from "react";
import "./Top.scss";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Top = () => {
  return (
    <div className="top">
      <Link
        to="/"
        className="app__top"
        style={{ left: "-3rem", top: "-.5rem" }}
      >
        <div
          className="app__logo"
          style={{ width: "4rem", height: "4rem" }}
        ></div>
        <div className="app__title">Trade Guide</div>
      </Link>
      <div style={{}}>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Top;
