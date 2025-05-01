import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../styles/Dashboard.css';
import { fetchBankTransfers, fetchScheduledTransfers } from '../data/transfers';
import chartImage from '../assets/react.svg'; // Replace with actual chart image or component
import SocialLinks from './SocialLinks';
import axios from '../api/axios';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [funds, setFunds] = useState('');
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const [bankTransfers, setBankTransfers] = useState([]);
  const [scheduledTransfers, setScheduledTransfers] = useState([]);

  const addFunds = async () => {
    try {
      const res = await axios.post('/wallet/add-funds', { amount: parseFloat(funds) });
      setBalance(res.data.balance);
      setFunds('');
    } catch (err) {
      alert('Add funds failed');
    }
  };

  const sendMoney = async () => {
    try {
      await axios.post('/transactions/send', {
        receiver_id: parseInt(receiver),
        amount: parseFloat(amount)
      });
      alert('Money sent!');
    } catch (err) {
      alert(err.response?.data?.message || 'Transaction failed');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankData = await fetchBankTransfers();
        setBankTransfers(Array.isArray(bankData) ? bankData : []);

        const scheduledData = await fetchScheduledTransfers();
        setScheduledTransfers(Array.isArray(scheduledData) ? scheduledData : []);

        const balanceRes = await axios.get('/wallet/balance');
        setBalance(balanceRes.data.balance);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='dashboard-container'>
      <Navbar />
      <h1 className="text-3xl mb-4">Dashboard</h1>

      <div className="dashboard">
        <div className="transfers">
          <h3>BANK TRANSFERS</h3>
          {bankTransfers.length > 0 ? (
            bankTransfers.map((transfer, index) => (
              <div key={index} className="transfer-item">
                {transfer.name} - {transfer.bank} – {transfer.amount} <span className={transfer.success ? "success" : "fail"}>{transfer.success ? "✔️" : "❌"}</span>
              </div>
            ))
          ) : (
            <p>No bank transfers available.</p>
          )}
        </div>

        <div className="scheduled">
          <h3>SCHEDULED TRANSFERS</h3>
          {scheduledTransfers.length > 0 ? (
            scheduledTransfers.map((transfer, index) => (
              <div key={index}>
                {transfer.name} – {transfer.amount} — {transfer.date}
              </div>
            ))
          ) : (
            <p>No scheduled transfers available.</p>
          )}
        </div>
      </div>

      <div className="p-6 max-w-xl mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Add Funds</h2>
          <input className="input" type="number" value={funds} onChange={(e) => setFunds(e.target.value)} />
          <button className="btn ml-2" onClick={addFunds}>Add</button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Send Money</h2>
          <input className="input" placeholder="Receiver ID" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
          <input className="input mt-2" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button className="btn mt-2" onClick={sendMoney}>Send</button>
        </div>

        <div className="mt-4 text-sm text-gray-500">Balance: {balance !== null ? `$${balance}` : 'Loading balance...'}</div>
      </div>

      <SocialLinks />
    </div>
  );
};

export default Dashboard;
