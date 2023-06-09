import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Error from "./Error";
import Main from "./Main/Main";
import Profile from "./Main/Profile/Profile";
import Trades from "./Main/Trades/NormTrades/Trades";
import TopTrades from "./Main/Trades/topTrades";
import Traders from "./Main/Traders/Traders";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli, polygonMumbai],
  [
    //alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "tradeGuide",
  projectId: "5ead8e22ae8b348313bf2b2b22acfe02",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/trades",
    element: <Trades />,
  },
  {
    path: "/toptraders",
    element: <Traders />,
  },
  {
    path: '/profile/:id',
    element: <Profile />
  },
  {
    path: "/toptrades/:index",
    element: <TopTrades />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
