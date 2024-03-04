import React, { useEffect, useState } from 'react';
import './Stocks.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


const Stocks = () => {

  const [stockData, setStockData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/stocks/stocks-list/");
        setStockData(response.data);
      } catch (error) {
        toast.error("Error fetching purchase data: " + error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="stocks-container">
      <div className="-stocks-table-container">
        <table className="stocks-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Items Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
          {stockData.map((stock, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stock.items_name}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.price}</td>
                </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
    <ToastContainer />
  </>
  );
}

export default Stocks;
