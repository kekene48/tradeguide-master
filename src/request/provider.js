import { ethers } from "ethers/lib";
import { useContext, createContext } from "react";
import { contractABI, contractAddress } from "../Utils";
import 

const TradeGuideContext = createContext();

const { ethereum } = window;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tradeguideContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return tradeguideContract;
};

export const Provider = ({ children }) => {
  const performSwap = async (tokenIn, tokenOut, amountIn) => {
    const tradeGuideContract = getContract();
    const _performSwap = await tradeGuideContract.swapExactInputSingleAlone(
      tokenIn,
      amountIn,
      tokenOut
    );
    const response = await _performSwap.wait();
    console.log(response);
  };
  const performSwapWithTPSL = async (
    tp,
    sl,
    _amountLink,
    amountIn,
    tokenIn,
    tokenOut
  ) => {
    const tradeGuideContract = getContract();
    const _performSwapWithTPSL = await tradeGuideContract.useTPandSL(
      tp,
      sl,
      _amountLink,
      amountIn,
      tokenIn,
      tokenOut
    );
    const response = await _performSwapWithTPSL.wait();
    console.log(response);
  };

  const subscribe = async (amountIn, to) => {
    const tradeGuideContract = getContract();
    const _subscribe = await tradeGuideContract.subscribe(amountIn, to);
    const response = await _subscribe.wait();
    console.log(response);
  };



  return (
    <TradeGuideContext.Provider
      value={{ performSwap, performSwapWithTPSL, subscribe }}
    >
      {children}
    </TradeGuideContext.Provider>
  );
};
export const useTradeGuideContext = () => useContext(TradeGuideContext);
