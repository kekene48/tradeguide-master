import { ethers } from "ethers/lib";
import { useContext, createContext } from "react";
import { contractABI, contractAddress } from "../Utils";
import { get } from "@pushprotocol/restapi/src/lib/user";

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

  const subscribe = async ( to) => {
    try {
      const tradeGuideContract = getContract();
      const _subscribe = await tradeGuideContract.subscribe( to);
      const response = await _subscribe.wait();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const setProfile = async (user, image, name) => {
    try {
      const tradeGuideContract = getContract();
      const _setprofile = await tradeGuideContract.setUserProfile(
        user,
        image,
        name
      );
      const res = await _setprofile.wait();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const setFee = async (user, fee) => {
    try {
      const tradeGuideContract = getContract();
      const _setFee = await tradeGuideContract.setSubscribersFee(fee, user);
      const res = await _setFee.wait();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  //_________________________Read Functions ________________________________

  const getTrades = async () => {
    try {
      const tradeGuideContract = getContract();
      const _getTrades = await tradeGuideContract.getTrades();
      return _getTrades;
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async (user) => {
    try {
      const tradeGuideContract = getContract();
      const _userProfile = await tradeGuideContract.getProfile(user);
      return _userProfile;
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscribers = async (user) => {
    try {
      const tradeGuideContract = getContract();
      const _subscribers = await tradeGuideContract.getSubcribers(user);
      return _subscribers;
    } catch (error) {
      console.log(error);
    }
  };

  const getNoSubscribers = async (user) => {
    try {
      const tradeGuideContract = getContract();
      const _getNoSubscribers = await tradeGuideContract.getNoSubscribers(user);
      return _getNoSubscribers;
    } catch (error) {
      console.log(error);
    }
  };
  const getNoTrades = async (user) => {
    try {
      const tradeGuideContract = getContract();
      const _getNoTrades = await tradeGuideContract.getNoTrades(user);
      return _getNoTrades;
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
        subscribe,
        setFee,
        getProfile,
        getSubscribers,
        getTrades,
        setProfile,
        getNoSubscribers,
        getNoTrades,
        getTotaltrades
      }}
    >
      {children}
    </TradeGuideContext.Provider>
  );
};
export const useTradeGuideContext = () => useContext(TradeGuideContext);
