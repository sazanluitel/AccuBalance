import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Company from "../company/Company";
import Cash_img from "../../assets/images/cash.png";
import "./User.css";

const User = ({ children }) => {
  return (
    <div className="main-container">
      <div className="user_container">
        {children}
      </div>
      <div className="design_container">
        <img src={Cash_img} alt="" className="cash_img" />
        <div className="greenbackground"></div>
      </div>
    </div>
  );
};

export default User;
