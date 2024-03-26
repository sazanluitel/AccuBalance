import React from 'react';
import './Company.css'
import Headingimg from "../../assets/images/heading_img.png";
import { useState, useEffect } from 'react';


const Company = () => {

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleAddCompany = async (e) =>{

  }
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
        <input
         type="text"
         name='name'
         placeholder="Enter your business name" />
      </div>
      <div className="address">
        <p>Address *</p>
        <input 
        type="text" 
        name ='address' 
        placeholder="Enter your business address" />
      </div>
      <div className="contact-num">
        <p>Contact No *</p>
        <input 
        type="number" 
        name='contact'
        placeholder="Enter your business contact no" />
      </div>
      <div className="reg-num">
        <p>Registaration No. *</p>
        <input 
        type="number" 
        name='regnum'
        placeholder="Enter your PAN/VAT no." />
      </div>
      <div className="company-btn">
          <button id="company-cancle-btn" onClick={handleAddCompany}>
            {/* <FaPlus /> */}
            Add
          </button>
        </div>
        
    </form>
  </div>
  );
}

export default Company;
