// Dash.js
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import './Dash.css';

const Dash = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // Redirect to login page if access token is not present
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="dash-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="navbar-container">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Dash;
