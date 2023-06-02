import { providers, Contract } from "ethers";
import { useContext, createContext } from "react";
import { contractABI, contractAddress } from "../Utils/constants";
import * as PushAPI from "@pushprotocol/restapi";
import { Web3Storage, File } from "web3.storage";
import qs from 'qs'

const TradeGuideContext = createContext();

export const channelAddress = "";

const { ethereum } = window;

const getContract = () => {
  const provider = new providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tradeguideContract = new Contract(contractAddress, contractABI, signer);

  return tradeguideContract;
};

function makeStorageClient() {
  return new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE });
}

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
      } catch (error) {}
    };

    function makeFileObjects() {
      // You can create File objects from a Buffer of binary data
      // see: https://nodejs.org/api/buffer.html
      // Here we're just storing a JSON object, but you can store images,
      // audio, or whatever you want!
      const obj = { hello: "world" };
      const buffer = Buffer.from(JSON.stringify(obj));

      const files = [new File([buffer], "hello.json")];
      return files;
    }

    async function storeFiles(files) {
      const client = makeStorageClient();
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
      return cid;
    }

    async function retrieve(cid) {
      const client = makeStorageClient();
      const res = await client.get(cid);
      console.log(`Got a response! [${res.status}] ${res.statusText}`);
      if (!res.ok) {
        throw new Error(`failed to get ${cid}`);
      }

      // request succeeded! do something with the response object here...
    }

    const subscribeToNotif = async (userAddress) => {
      const provider = new providers.Web3Provider(ethereum);
      const _signer = provider.getSigner();

      try {
        await PushAPI.channels.subscribe({
          signer: _signer,
          channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
          userAddress: `eip155:5:${userAddress}`, // user address in CAIP
          onSuccess: () => {
            console.log("opt in success");
          },
          onError: () => {
            console.error("opt in error");
          },
          env: "staging",
        });
      } catch (error) {
        console.log(error);
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

  const subscribe = async (to) => {
    try {
      const tradeGuideContract = getContract();
      const _subscribe = await tradeGuideContract.subscribe(to);
      const response = await _subscribe.wait();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const setProfile = async (link) => {
    try {
      const tradeGuideContract = getContract();
      const _setprofile = await tradeGuideContract.setUserProfile(link);
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
        getTotaltrades,
         subscribeToNotif,
      }}
    >
      {children}
    </TradeGuideContext.Provider>
  );
};
export const useTradeGuideContext = () => useContext(TradeGuideContext);
