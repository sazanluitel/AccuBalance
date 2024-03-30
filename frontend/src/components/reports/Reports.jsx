import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Report.css";

const Reports = () => {
  const [salesStats, setSalesStats] = useState({});
  const [purchaseStats, setPurchaseStats] = useState({});

  useEffect(() => {
    //fetching the sales stats data
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/sales/stats/"
        );
        if (!response.data) {
          throw new Error("Failed to fetch data");
        }
        setSalesStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    //fetching the purchase stats data
    const fetchPurchaseData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/purchase/purchase-stats/"
        );
        if (!response.data) {
          throw new Error("Failed to fetch data");
        }
        setPurchaseStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalesData();
    fetchPurchaseData();
  }, []);

  //purchase Data
  const num_of_purchases = purchaseStats.num_of_purchases;
  const total_purchase_amount = purchaseStats.total_purchase_amount;
  const total_payable_amount = purchaseStats.total_payable_amount;

  //sales data
  const num_of_sells = salesStats.num_of_sells;
  const total_sales_amount = salesStats.total_sales_amount;
  const total_receivable_amt = salesStats.total_receivable_amt;
  const total_tax_amount = salesStats.total_tax_amount;

  const handlePrint = () => {
    window.print();
  }; // Open the print page

  return (
    <>
      <div className="report">
        <div className="report-heading">
          <div className="print-btn">
            <button onClick={handlePrint}>Print</button>
          </div>
        </div>
        <table className="report-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Particulars</th>
              <th>Quantity</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 </td>
              <td>Total Number of Purchases</td>
              <td>{num_of_purchases}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>2 </td>
              <td>Total Purchase Amount</td>
              <td></td>
              <td>{total_purchase_amount}</td>
              <td></td>
              <td>{total_purchase_amount}</td>
            </tr>
            <tr>
              <td>3 </td>
              <td>Total payable amount</td>
              <td></td>
              <td></td>
              <td>{total_payable_amount}</td>
              <td>{total_payable_amount}</td>
            </tr>
            <tr>
              <td>4 </td>
              <td>Total Number of Sells</td>
              <td>{num_of_sells}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>5 </td>
              <td>Total Sales Amount</td>
              <td></td>
              <td></td>
              <td>{total_sales_amount}</td>
              <td>{total_sales_amount}</td>
            </tr>
            <tr>
              <td>6 </td>
              <td>Total Receivable Amount</td>
              <td></td>
              <td></td>
              <td>{total_receivable_amt}</td>
              <td>{total_receivable_amt}</td>
            </tr>
            <tr>
              <td>7 </td>
              <td>Total Tax Amount</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{total_tax_amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reports;
