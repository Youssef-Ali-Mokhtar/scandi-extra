import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "./store/CartProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>
);
