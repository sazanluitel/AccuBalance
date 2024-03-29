import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../modals/Modal";
import "./Sales.css";

const Sales = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salesData, setSalesData] = useState([]);

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/sales/sales-list/"
      );
      setSalesData(response.data);

      //calling send-email url if for sending the url
      await axios.get("http://127.0.0.1:8000/api/sales/email-sender/")
    } catch (error) {
      toast.error("Error fetching purchase data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalSubmit = async () => {
    // Fetch data only when the modal is closed by clicking the submit button
    await fetchData();
    handleCloseModal();
  };

  return (
    <>
      <div className="sales-container">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          endpoint="http://127.0.0.1:8000/api/sales/add_sales/"
          onSuccess={handleModalSubmit} // Pass handleModalSubmit as onSuccess prop
        />
        <div className="sales-add-btn">
          <button id="sales-add-btn" onClick={handleAddNew}>
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
                <th>Amt Received</th>
                <th>Tax</th>
                <th>Grand Total</th>
                <th>Receivable amount</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sales, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sales.customer}</td>
                  <td>{sales.items_name}</td>
                  <td>{sales.quantity}</td>
                  <td>{sales.price}</td>
                  <td>{sales.total_price}</td>
                  <td>{sales.amt_received}</td>
                  <td>{sales.tax}</td>
                  <td>{sales.grand_total}</td>
                  <td>{sales.receivable_amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Sales;
