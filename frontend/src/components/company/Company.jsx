import React from 'react';
import './Company.css'
import Headingimg from "../../assets/images/heading_img.png";


const Company = () => {
  return (
    <div className="company_container">
    <div className="heading_img">
      <img src={Headingimg} alt="" />
      <h1>Accubalance</h1>
    </div>
    <h2>Bussiness Details</h2>
    <span>Please fill up details to proceed.</span>
    <form action="submit" className="loginform">
      <div className="name">
        <p>Business Name *</p>
        <input type="text" placeholder="Enter your business name" />
      </div>
      <div className="address">
        <p>Address *</p>
        <input type="text" placeholder="Enter your business address" />
      </div>
      <div className="password">
        <p>Contact No *</p>
        <input type="number" placeholder="Enter your business contact no" />
      </div>
      <div className="confirm_password">
        <p>Registaration No. *</p>
        <input type="number" placeholder="Enter your PAN/VAT no." />
      </div>
      <div className="company-btn">
        <input type="button" value="Register" />
        <input className="company-cancle-btn" type="button" value="Cancle" />
      </div>
    </form>
  </div>
  );
}

export default Company;
