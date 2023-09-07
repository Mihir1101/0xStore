import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="title">
      <h1 id="home-title">0xStore</h1>
      </div>
      <div className="wallet-info">
      <ConnectWallet/>
      </div>
    </div>
  );
}