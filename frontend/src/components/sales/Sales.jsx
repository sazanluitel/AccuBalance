import React from 'react';
import { FaPlus } from "react-icons/fa6";
import "./Sales.css";



const Sales = () => {
  return (
    <>
      <div className="sales-container">
        <div className="sales-add-btn">
          <button id="sales-add-btn">
            <FaPlus />
            Add New
          </button>
        </div>
        <div className="-sales-table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Customer</th>
                <th>Items Name</th>
                <th>Quantiy</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Amt Paid</th>
                <th>Tax</th>
                <th>Grand Total</th>
                <th>Receivable amount</th>
              </tr>
            </thead>
            <tr>
              <td>1</td>
              <td>Sujan Traders</td>
              <td>Sunflower Oil</td>
              <td>25</td>
              <td>60</td>
              <td>55</td>
              <td>656</td>
              <td>15</td>
              <td>5145</td>
              <td>515</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sujan Traders</td>
              <td>Sunflower Oil</td>
              <td>25</td>
              <td>60</td>
              <td>55</td>
              <td>656</td>
              <td>15</td>
              <td>5145</td>
              <td>515</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sujan Traders</td>
              <td>Sunflower Oil</td>
              <td>25</td>
              <td>60</td>
              <td>55</td>
              <td>656</td>
              <td>15</td>
              <td>5145</td>
              <td>515</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Sujan Traders</td>
              <td>Sunflower Oil</td>
              <td>25</td>
              <td>60</td>
              <td>55</td>
              <td>656</td>
              <td>15</td>
              <td>5145</td>
              <td>515</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default Sales;
