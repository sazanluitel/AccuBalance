import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Headingimg from "../../assets/images/heading_img.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const history = useHistory();

  const handleSignupClick = () => {
    history.push("/signup"); // Redirect to the signup page
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();

        //acessing the tokens
        const accessToken = data.token.access;
        const refreshToken = data.token.refresh;

        //storing the token in local storage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        toast.success("Login successful");

        history.push("/"); // dashoard
      } else {
        const data = await response.json();
        for (const key in data) {
          if (Array.isArray(data[key])) {
            data[key].forEach((error) => {
              toast.error(error);
            });
          } else {
            toast.error(data[key]);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login_container">
      <div className="heading_img">
        <img src={Headingimg} alt="" />
        <h1>Accubalance</h1>
      </div>
      <h2>Login</h2>
      <span>Please fill up requirement to proceed.</span>
      <form className="loginform" onSubmit={handleLoginClick}>
        <div className="email">
          <p>Email *</p>
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
        </div>
        <div className="password">
          <p>Password *</p>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
        </div>
        <div className="Loginbtn">
          <button type="submit">Login</button>
        </div>
        <div className="no_acc">
          <span>Don't have an account?</span>
          <button type="button" onClick={handleSignupClick}>
            SignUp
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
