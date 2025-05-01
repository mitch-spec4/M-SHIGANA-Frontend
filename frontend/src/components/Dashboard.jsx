import React from 'react';
import Navbar from './Navbar';
import '../styles/Dashboard.css';
import { bankTransfers, scheduledTransfers } from '../data/transfers';
import chartImage from '../assets/react.svg'; // Replace with actual chart image or component
import SocialLinks from './SocialLinks';

const Dashboard = () => {
  return (
    <div className='dashboard-container'>
      <Navbar />

      <div className="dashboard">
        <div className="transfers">
          <h3>BANK TRANSFERS</h3>
          {bankTransfers.map((transfer, index) => (
            <div key={index} className="transfer-item">
              {transfer.name} - {transfer.bank} – {transfer.amount} <span className={transfer.success ? "success" : "fail"}>{transfer.success ? "✔️" : "❌"}</span>
            </div>
          ))}
        </div>

        <div className="scheduled">
          <h3>SCHEDULED TRANSFERS</h3>
          {scheduledTransfers.map((transfer, index) => (
            <div key={index}>
              {transfer.name} – {transfer.amount} — {transfer.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
