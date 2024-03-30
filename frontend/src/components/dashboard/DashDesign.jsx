import React, { useState, useEffect } from "react";
import { GiWallet } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import "./DashDesign.css";
import BarChart from "./BarGraphs";
import PieChart from "./PieCharts";
import { UserData } from "./ChartsData";
import axios from "axios";

const DashDesign = () => {
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      // Redirect to login page if access token is not present
      history.push("/login");
    }
  }, [history]);

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

  // Access the properties after they are guaranteed to be populated
  const total_tax_amount = salesStats.total_tax_amount;
  const total_receivable_amt = salesStats.total_receivable_amt;
  const total_payable_amount = purchaseStats.total_payable_amount;

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <div className="amount-section">
        {/* for total amount  */}
        <div className="amtbox">
          <div className="amt-img total-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Total Tax</h1>
            <h2> {total_tax_amount} </h2>
          </div>
        </div>
        {/* for amount receivable  */}
        <div className="amtbox">
          <div className="amt-img receivable-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Amount Receivable</h1>
            <h2> {total_receivable_amt}</h2>
          </div>
        </div>
        {/* for amount payable */}
        <div className="amtbox">
          <div className="amt-img payable-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Amount Payable</h1>
            <h2> {total_payable_amount}</h2>
          </div>
        </div>
      </div>
      <div className="charts-section">
        <div className="barchart" style={{ width: 500 }}>
          <BarChart chartData={userData} />
        </div>
        <div className="piechart" style={{ width: 400 }}>
          <PieChart chartData={userData} />
        </div>
      </div>
    </>
  );
};

export default DashDesign;
