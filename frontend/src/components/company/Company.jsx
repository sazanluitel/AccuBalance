import React, { useState } from "react";
import "./Company.css";
import Headingimg from "../../assets/images/heading_img.png";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Company = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    reg_num: "",
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/company/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Registration successful");
        history.push("/");
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
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="company_container">
      <div className="heading_img">
        <img src={Headingimg} alt="" />
        <h1>Accubalance</h1>
      </div>
      <h2>Business Details</h2>
      <span>Please fill up details to proceed.</span>
      <form onSubmit={handleAddCompany} className="loginform"> {/* Use onSubmit instead of action */}
        <div className="name">
          <p>Business Name *</p>
          <input
            type="text"
            name="name"
            placeholder="Enter your business name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="address">
          <p>Address *</p>
          <input
            type="text"
            name="address"
            placeholder="Enter your business address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="contact-num">
          <p>Contact No *</p>
          <input
            type="number"
            name="contact"
            placeholder="Enter your business contact no"
            value={formData.contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="reg-num">
          <p>Registration No. *</p>
          <input
            type="number"
            name="reg_num"
            placeholder="Enter your PAN/VAT no."
            value={formData.reg_num}
            onChange={handleInputChange}
          />
        </div>
        <div className="company-btn">
          <button id="company-cancle-btn" type="submit">
            Add
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Company;
