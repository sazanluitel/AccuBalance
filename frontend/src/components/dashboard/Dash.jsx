import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import './Dash.css'

const Dash = ({children}) => {
  return (
    <>
      <div className="dash-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="navbar-container">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default Dash;
