import React, { useState, useEffect } from "react";
import { GiWallet } from "react-icons/gi";
import { useHistory } from "react-router-dom";
import "./DashDesign.css"; // Make sure this file exists and contains your CSS styles
import BarChart from "./BarGraphs";
import PieChart from "./PieCharts";
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
  const [pieChartData, setPieChartData] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [purchaseData, setPurchaseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sales stats data
        const salesResponse = await axios.get("http://127.0.0.1:8000/api/sales/stats/");
        setSalesStats(salesResponse.data);

        // Fetch purchase stats data
        const purchaseResponse = await axios.get("http://127.0.0.1:8000/api/purchase/purchase-stats/");
        setPurchaseStats(purchaseResponse.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch stock data
        const stockResponse = await axios.get("http://127.0.0.1:8000/api/stocks/stocks-list/");
        const stockData = stockResponse.data;

        // Set pie chart data
        setPieChartData({
          labels: stockData.map(item => item.items_name),
          datasets: [
            {
              label: "Stock Left",
              data: stockData.map(item => item.quantity),
              backgroundColor: [
                "#f3ba2f",
                "#2a71d0",
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#FF6633",
                "#FFB399",
                "#FF33FF",
                "#FFFF99",
                "#00B3E6",
                "#E6B333",
                "#3366E6",
                "#999966",
                "#99FF99",
                "#B34D4D",
                "#80B300",
                "#809900",
                "#E6B3B3",
                "#6680B3",
                "#66991A"
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        });

        // Fetch sales data
        const salesResponse = await axios.get("http://127.0.0.1:8000/api/sales/stats/");
        setSalesData(salesResponse.data);

        // Fetch purchase data
        const purchaseResponse = await axios.get("http://127.0.0.1:8000/api/purchase/purchase-stats/");
        setPurchaseData(purchaseResponse.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <>
      <div className="amount-section">
        <div className="amtbox">
          <div className="amt-img total-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Total Tax</h1>
            <h2>{salesStats.total_tax_amount}</h2>
          </div>
        </div>
        <div className="amtbox">
          <div className="amt-img receivable-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Amount Receivable</h1>
            <h2>{salesStats.total_receivable_amt}</h2>
          </div>
        </div>
        <div className="amtbox">
          <div className="amt-img payable-img">
            <GiWallet />
          </div>
          <div className="name-and-amt">
            <h1>Amount Payable</h1>
            <h2>{purchaseStats.total_payable_amount}</h2>
          </div>
        </div>
      </div>
      <div className="charts-section">
        <div className="barchart" style={{ width: 500 }}>
          {salesData && purchaseData && <BarChart salesData={salesData} purchaseData={purchaseData} />}
        </div>
        <div className="piechart" style={{ width: 400 }}>
          {pieChartData && <PieChart chartData={pieChartData} />}
        </div>
      </div>
    </>
  );
};

export default DashDesign;
