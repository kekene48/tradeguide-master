import React from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Top from "./Top";
import "./main.scss";

const Main = () => {
  return (
    <>
      <Top />
      <div className="main">
        <Sidebar />
      </div>
    </>
  );
};

export default Main;
