import React from "react";
import Headingimg from "../../assets/images/heading_img.png";
import "./Signup.css";

const Signup = ({ onLoginClick, onSignupFormSubmit }) => {
  const handleLoginClick = () => {
    onLoginClick();
  };

  const handleSignupClick = () => {
    onSignupFormSubmit();
  };

  return (
    <div className="signup_container">
      <div className="heading_img">
        <img src={Headingimg} alt="" />
        <h1>Accubalance</h1>
      </div>
      <h2>Signup</h2>
      <span>Please fill up requirement to proceed.</span>
      <form action="submit" className="loginform">
        <div className="name">
          <p>Full Name *</p>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="email">
          <p>Email *</p>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="password">
          <p>Password *</p>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div className="confirm_password">
          <p>Confirm Password *</p>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div className="signup">
          <input type="button" value="Signup" onClick={handleSignupClick} />
        </div>
        <div className="already_acc">
          <span>Already have account ?</span>
          <input
            type="button"
            value="Login"
            onClick={handleLoginClick}
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
