import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Modal.css";
import { useLocation } from "react-router-dom";

const Modal = ({ isOpen, onClose, endpoint, onSuccess }) => {
  const location = useLocation();

  const getParticulars = () => {
    switch (location.pathname) {
      case "/purchase":
        return [
          "Vendor",
          "Paid Amount",
          "Payable Amount",
          "vendor",
          "amt_paid",
        ];
      case "/sales":
        return [
          "Customer",
          "Received Amount",
          "Receivable Amount",
          "customer",
          "amt_received",
        ];
      default:
        return ["", ""];
    }
  };

  const [firstPart, secondPart, thirdPart, fourthPart, fifthPart] =
    getParticulars();

  const [formData, setFormData] = useState({
    [fourthPart]: "",
    items_name: "",
    quantity: "",
    price: "",
    [fifthPart]: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price when quantity or price changes
    const calculateTotalPrice = () => {
      const price = parseFloat(formData.price);
      const quantity = parseFloat(formData.quantity);
      const totalPrice = price * quantity * 1.13; // Applying 13% on the total
      setTotalPrice(isNaN(totalPrice) ? 0 : totalPrice);
    };
    calculateTotalPrice();
  }, [formData.price, formData.quantity]);

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(endpoint, formData);
      toast.success("Data posted Successfully");
      onSuccess(); // Call onSuccess callback upon successful submission
      handleCloseModal();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleCloseModal = () => {
    // Clear form data and close modal
    setFormData({
      [fourthPart]: "",
      items_name: "",
      quantity: "",
      price: "",
      [fifthPart]: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div id="modal-container" className="modal-container">
        <div className="modal-part">
          <button className="modal-close-btn" onClick={handleCloseModal}>
            <AiOutlineClose />
          </button>

          <div className="modal-forms-part">
            <h1>Enter the details to proceed</h1>
            <form
              className="modal-forms"
              action="submit"
              method="post"
              onSubmit={handleModalSubmit}
            >
              <div className="modal-vendor">
                <p>{firstPart}</p>
                <input
                  type="text"
                  name="{firstPart}" // here choosing between vendor/customer
                  placeholder={`Enter the ${firstPart.toLowerCase()} name`}
                  value={formData[fourthPart]}
                  onChange={(e) =>
                    setFormData({ ...formData, [fourthPart]: e.target.value })
                  }
                />
              </div>
              <div className="modal-items-name">
                <p>Items Name</p>
                <input
                  type="text"
                  name="items_name"
                  placeholder="Enter the Items name"
                  value={formData.items_name}
                  onChange={(e) =>
                    setFormData({ ...formData, items_name: e.target.value })
                  }
                />
              </div>
              <div className="modal-quantity">
                <p>Quantity</p>
                <input
                  type="number"
                  name="quantity"
                  placeholder=" Enter the quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />
              </div>
              <div className="modal-price">
                <p>Price</p>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter the price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="modal-amount">
                <p>{secondPart}</p>
                <input
                  type="number"
                  name="{secondPart}"
                  placeholder={`Enter the ${secondPart}`}
                  value={formData[fifthPart]}
                  onChange={(e) =>
                    setFormData({ ...formData, [fifthPart]: e.target.value })
                  }
                />
              </div>
              <div className="modal-submit-btn">
                <button>Submit</button>
              </div>
              <ToastContainer />
            </form>
            <div className="modal-details">
              <p>Total Price with 13% tax = {totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
