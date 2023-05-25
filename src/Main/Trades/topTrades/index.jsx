import React, { useState } from "react";
import Sidebar from "../../Sidebar";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis"
import { useAccount } from 'wagmi'


const Index = () => {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState([]);
  //let address;
  const {address} = useAccount()

  const handleSubmit = async () => {
    //address = document.querySelector("#walletAddress").ariaValueMax;
    const chain = EvmChain.ETHEREUM;

    await Moralis.start({
      apiKey: process.env.REACT_APP_MORALIS_API,
    });

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });

    // console.log(response.toJSON());
    setResult(response.toJSON());
    setShowResult(true);
    document.querySelector("#walletAddress").value = "";
  };

  console.log(result)


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      Top Trades
      <div className="container">
        <form action="#" method="POST">
          <label htmlFor="walletAddress">Add ERC20 wallet Address</label>
          <input
            type="text"
            name="walletAddress"
            id="walletAddress"
            max="120"
            required
          />
        </form>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  );
};

export default Index;
