import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios"; 
import Headingimg from "../../assets/images/heading_img.png";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();

    //checking if the password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password don't match");
      return;
    }try {
      const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      if (response.ok) {
        toast.success('Registration successful');
        // You may redirect the user to another page upon successful registration
        history.push("/company");
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
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleLoginClick = () => {
    history.push("/login"); // Redirect to the login page
  };

  return (
    <div className="signup_container">
      <div className="heading_img">
        <img src={Headingimg} alt="Logo" />
        <h1>Accubalance</h1>
      </div>
      <h2>Signup</h2>
      <span>Please fill up requirement to proceed.</span>
      <form className="signupform" onSubmit={handleSignupClick}>
        <div className="name">
          <p>Full Name *</p>
          <input
            type="text"
            name="name" // Changed from fullName to name
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="email">
          <p>Email *</p>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="password">
          <p>Password *</p>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className={"confirm_password"}>
          <p>Confirm Password *</p>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="signup">
          <button type="submit">Signup</button>
        </div>
        <div className="already_acc">
          <span>Already have an account?</span>
          <button type="button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
