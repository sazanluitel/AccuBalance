import React from "react";
import {Link, useHistory} from 'react-router-dom'
import Headingimg from "../../assets/images/heading_img.png";
import "./Sidebar.css";
import { CiHome } from "react-icons/ci";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { TbCash } from "react-icons/tb";
import { BiSolidCollection } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  const history = useHistory();
  //handling the logout button
  const handleLogout = ()  =>{
    //removing tokens stored
    localStorage.removeItem("accessToken")

    //redirect to login
    history.push("/login")
  }
  return (
    <>
      <div className="sidebar">
        <div className="logo_part">
          <img src={Headingimg} alt="" />
          <h1>AccuBalance</h1>
        </div>
        <div className="menus">
          <h1>Menus </h1>
          <ul>
            <li>
              <Link to="/">
                <CiHome />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/purchase">
                <BiPurchaseTagAlt />
                Purchase
              </Link>
            </li>
            <li>
              <Link to="/sales">
                <TbCash />
                Sales
              </Link>
            </li>
            <li>
              <Link to="/stocks">
                <BiSolidCollection />
                Stocks
              </Link>
            </li>
            <li>
              <Link to="/reports">
                <TbReportSearch />
                Reports
              </Link>
            </li>
          </ul>
          <div className="logout" onClick={handleLogout}>
            <Link to="/logout">
              <CiLogout />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
