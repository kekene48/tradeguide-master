import React from "react";
import "./sidebar.scss";
import { BsFillPersonFill } from "react-icons/bs";
import { GiTrade } from "react-icons/gi";
import { MdOutlineGppGood } from "react-icons/md";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { MdGppBad } from "react-icons/md";
import { Link } from "react-router-dom";
import "../bootstrap.min.css";

const Sidebar = () => {
  return (
    <div className="sidebar py-5">
      <Link to="/main">
        <div className="profile options">
          <BsCurrencyBitcoin />
          <h2>Main</h2>
        </div>
      </Link>

      <Link to="/profile">
        <div className="profile options">
          <BsFillPersonFill />
          <h2>Profile</h2>
        </div>
      </Link>

      <Link to="/trades">
        <div className="trades options">
          <GiTrade />
          <h2>Trades</h2>
        </div>
      </Link>
      <Link to="/toptraders">
        <div className="toptraders options">
          <MdOutlineGppGood />
          <h2>Top Traders</h2>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
