import React from "react";
import Headingimg from "../../assets/images/heading_img.png";
import "./Sidebar.css";
import { CiHome } from "react-icons/ci";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { TbCash } from "react-icons/tb";
import { BiSolidCollection } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
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
              <a href="/">
                <CiHome />
                Dashboard
              </a>
            </li>
            <li>
              <a href="/purchase">
                <BiPurchaseTagAlt />
                Purchase
              </a>
            </li>
            <li>
              <a href="/sales">
                <TbCash />
                Sales
              </a>
            </li>
            <li>
              <a href="/stocks">
                <BiSolidCollection />
                Stocks
              </a>
            </li>
            <li>
              <a href="/reports">
                <TbReportSearch />
                Reports
              </a>
            </li>
          </ul>
          <div className="logout">
            <a href="/logout">
              <CiLogout />
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
