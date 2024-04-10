import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ salesData, purchaseData }) => {
  const chartData = {
    labels: ['Total Sales Amount', 'Total Receivable Amount', 'Total Tax Amount', 'Total Purchase Amount', 'Total Payable Amount'],
    datasets: [
      {
        label: 'Amount',
        data: [
          salesData.total_sales_amount,
          salesData.total_receivable_amt,
          salesData.total_tax_amount,
          purchaseData.total_purchase_amount,
          purchaseData.total_payable_amount
        ],
        backgroundColor: [
          '#f3ba2f',
          '#2a71d0',
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95'
          // Add more colors as needed
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
