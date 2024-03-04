import React from "react";
import { useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const getPageName = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/purchase":
        return "Purchase";
      case "/sales":
        return "Sales";
      case "/stocks":
        return "Stocks";
      case "/reports":
        return "Reports";
      default:
        return "";
    }
  };

  return (
    <div className="nav">
      <div className="heading_name">
        <h1 className={`pagename ${getPageName().toLowerCase()}`}>
          {getPageName()}
        </h1>
      </div>
      <div className="profile_part">
        <div className="profile_img">
          <CgProfile />
        </div>
        <div className="profile_name">
          <a href="/profile">Sajan Luitel</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
