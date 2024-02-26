import React from "react";
import { GiWallet } from "react-icons/gi";
import './DashDesign.css'

const Dash_design = () => {
  return (
    <>
      <div className="amount-section">
        {/* for total amount  */}
        <div className="amtbox">
          <div className="amt-img total-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Total Amount</h1>
            <h2>5000</h2>
          </div>
        </div>
        {/* for amount receivable  */}
        <div className="amtbox">
          <div className="amt-img receivable-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Amount Receivable</h1>
            <h2>5000</h2>
          </div>
        </div>
        {/* for amoount payable */}
        <div className="amtbox">
          <div className="amt-img payable-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Amount Payable</h1>
            <h2>5000</h2>
          </div>
        </div>
      </div>
      <div className="charts-section">
        
      </div>
    </>
  );
};

export default Dash_design;
