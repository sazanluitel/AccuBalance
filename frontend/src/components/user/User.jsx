// User.jsx
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Cash_img from "../../assets/images/cash.png";
import "./User.css";

const User = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="main-container">
      <div className="user_container">
        {showLogin ? (
          <Login onSignupClick={handleToggle} />
        ) : (
          <Signup onLoginClick={handleToggle} />
        )}
      </div>
      <div className="design_container">
        <img src={Cash_img} alt="" className="cash_img" />
        <div className="greenbacakground"></div>
      </div>
    </div>
  );
};

export default User;
