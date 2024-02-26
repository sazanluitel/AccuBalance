import React from "react";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="heading_name">
          <h1 className="pagename">Dashboard</h1>
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
    </>
  );
};

export default Navbar;
