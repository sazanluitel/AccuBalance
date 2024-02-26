import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashDesign from "./DashDesign";
import './Dash.css'

const Dash = () => {
  return (
    <>
      <div className="dash-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="navbar-container">
          <Navbar />
          <DashDesign/>
        </div>
      </div>
    </>
  );
};

export default Dash;
