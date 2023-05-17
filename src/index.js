import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Error from './Error';
import Main from './Main/Main'
import Profile from './Main/Profile/Profile'
import Trades from './Main/Trades/NormTrades/Trades'
import TopTrades from './Main/Trades/topTrades'
import Traders from './Main/Traders/Traders'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />
  },
  {
    path: "/main",
    element: <Main />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/trades",
    element: <Trades />
  },
  {
    path: "/toptraders",
    element: <Traders />
  },
  {
    path: "/toptrades",
    element: <TopTrades />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
