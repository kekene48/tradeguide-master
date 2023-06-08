import { providers, Contract } from "ethers";
import { useContext, createContext } from "react";
import { contractABI, contractAddress } from "../Utils/constants";

import qs from "qs";

const TradeGuideContext = createContext();

export const channelAddress = "";

const { ethereum } = window;

const getContract = () => {
  const provider = new providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tradeguideContract = new Contract(contractAddress, contractABI, signer);

  return tradeguideContract;
};

export const Provider = ({ children }) => {
  const getQuote = async (_tokenS, _tokenB, amount) => {
    try {
      const params = {
        sellToken: _tokenS,
        buyToken: _tokenB,
        // Note that the DAI token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
        sellAmount: amount,
      };

      const headers = { "0x-api-key": process.env.REACT_APP_OXAPI_KEY };
      const response = await fetch(
        `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
        { headers }
      );
      console.log(await response.json());
    } catch (error) {
      console.log(error)
    }
  };


  const performSwap = async (tokenIn, tokenOut, amountIn) => {
    try {
      const tradeGuideContract = getContract();
      const _performSwap = await tradeGuideContract.swapExactInputSingleAlone(
        tokenIn,
        amountIn,
        tokenOut
      );
      const response = await _performSwap.wait();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const performSwapWithTPSL = async (
    tp,
    sl,
    _amountLink,
    amountIn,
    tokenIn,
    tokenOut
  ) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };





 

  const addPost = async (link) => {
    try {
      const tradeGuideContract = getContract();
      const _addPost = await tradeGuideContract.addAPost(link);
      const res = await _addPost.wait();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //_________________________Read Functions ________________________________

  const getPosts = async () => {
    try {
      const tradeGuideContract = getContract();
      const _getPosts = await tradeGuideContract.getPosts();
      return _getPosts;
    } catch (error) {
      console.log(error);
    }
  };

 

 

 

  const getTotaltrades = async (user) => {
    try {
      const tradeGuideContract = getContract();
      const _getTotalTrades = await tradeGuideContract.getTotalTrades(user);
      return _getTotalTrades;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TradeGuideContext.Provider
      value={{
        performSwap,
        performSwapWithTPSL,
        getTotaltrades,
        getQuote,
        getPosts,
        addPost,
      }}
    >
      {children}
    </TradeGuideContext.Provider>
  );
};
export const useTradeGuideContext = () => useContext(TradeGuideContext);
