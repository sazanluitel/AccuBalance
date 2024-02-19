import React from "react";
import Headingimg from "../../assets/images/heading_img.png";
import "./Login.css";

const Login = ({ onSignupClick }) => {
  const handleSignupClick = () => {
    onSignupClick();
  };

  return (
    <>
      <div className="login_container">
        <div className="heading_img">
          <img src={Headingimg} alt="Image" />
          <h1>Accubalance</h1>
        </div>
        <h2>Login</h2>
        <span>Please fill up requirement to proceed.</span>
        <form action="submit" className="loginform">
          <div className="email">
            <p>Email *</p>
            <input type="text" placeholder="Enter your email" />
          </div>
          <div className="password">
            <p>Password *</p>
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="Loginbtn">
            <input type="button" value="Login" />
          </div>
          <div className="no_acc">
            <span>Don't have account ?</span>
            <input
              type="button"
              value="SignUp"
              onClick={handleSignupClick}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
