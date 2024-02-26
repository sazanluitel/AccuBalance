import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Company from "../company/Company";
import Cash_img from "../../assets/images/cash.png";
import Headingimg from "../../assets/images/heading_img.png";
import "./User.css";

const User = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showCompany, setShowCompany] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    setShowCompany(false);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
    setShowCompany(false);
  };

  const handleSignupFormSubmit = () => {
    setShowLogin(false);
    setShowSignup(false);
    setShowCompany(true);
  };

  return (
    <div className="main-container">
      <div className="user_container">
        {showLogin && <Login onSignupClick={handleSignupClick} />}
        {showSignup && <Signup onLoginClick={handleLoginClick} onSignupFormSubmit={handleSignupFormSubmit} />}
        {showCompany && <Company />}
      </div>
      <div className="design_container">
        <img src={Cash_img} alt="" className="cash_img" />
        <div className="greenbackground"></div>
      </div>
    </div>
  );
};

export default User;
