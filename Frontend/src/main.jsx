import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./context/CartProvider";
import { WishlistProvider } from "./context/WishlistProvider";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <WishlistProvider>

      <CartProvider>

        <App />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />

      </CartProvider>

    </WishlistProvider>

  </React.StrictMode>

);