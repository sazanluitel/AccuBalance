import React from 'react';
import './Stocks.css'

const Stocks = () => {
  return (
    <>
    <div className="stocks-container">
      <div className="-stocks-table-container">
        <table className="stocks-table">
          <thead>
            <tr>
              <th>SN</th>
              <th>Items Name</th>
              <th>Quantiy</th>
              <th>Price</th>
            </tr>
          </thead>
          <tr>
            <td>1</td>
            <td>Sujan Traders</td>
            <td>25</td>
            <td>60</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Sujan Traders</td>
            <td>25</td>
            <td>60</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Sujan Traders</td>
            <td>25</td>
            <td>60</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Sujan Traders</td>
            <td>25</td>
            <td>60</td>
          </tr>
        </table>
      </div>
    </div>
  </>
  );
}

export default Stocks;
