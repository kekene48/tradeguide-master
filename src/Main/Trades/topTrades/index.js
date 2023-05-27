import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import Data from '../../../Utils/Data.json'


const Index = () => {

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      Top Trades
      {Data.map(token => {
        return (
          <>
            <p>{token.name}</p> 
            <p>{token.price}</p>
          </>
        ) 
      })}
    </div>
  );
};

export default Index;
