import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import "./Purchase.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../modals/Modal";

const Purchase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const [purchaseData, setPurchaseData] = useState([]);

const handleCloseModal = async () => {
  setIsModalOpen(false);
  // Refetch purchase data to update the table
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/purchase/purchase-list/");
    const newPurchaseData = response.data;
    // Prepend the new purchase to the existing purchaseData array
    // setPurchaseData([...newPurchaseData, ...purchaseData]);
  } catch (error) {
    toast.error("Error fetching purchase data:", error);
  }
};

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/purchase/purchase-list/");
        setPurchaseData(response.data);
      } catch (error) {
        toast.error("Error fetching purchase data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="purchase-container">
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          endpoint="http://127.0.0.1:8000/api/purchase/add_purchase/"
        />
        <div className="purchase-add-btn">
          <button id="purchase-add-btn" onClick={handleAddNew}>
            <FaPlus />
            Add New
          </button>
        </div>
        <div className="-purchase-table-container">
          <table className="purchase-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Vendor</th>
                <th>Items Name</th>
                <th>Quantiy</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Tax</th>
                <th>Grand Total</th>
                <th>Amt Paid</th>
                <th>Payable amount</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData.map((purchase, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{purchase.vendor}</td>
                  <td>{purchase.items_name}</td>
                  <td>{purchase.quantity}</td>
                  <td>{purchase.price}</td>
                  <td>{purchase.total_price}</td>
                  <td>{purchase.tax}</td>
                  <td>{purchase.grand_total}</td>
                  <td>{purchase.amt_paid}</td>
                  <td>{purchase.payable_amt}</td>
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

export default Purchase;
