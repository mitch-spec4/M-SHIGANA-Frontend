import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

axios.defaults.baseURL = 'http://localhost:5000/api';

function Wallet() {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the wallet balance if it's not in localStorage
  const fetchBalance = async () => {
    if (!user) {
      console.log('No user in context');
      return;
    }

    // console.log('Fetching balance for user:', user);

    const token = localStorage.getItem('token');  // Get the JWT token from localStorage

    try {
      const response = await axios.get('/wallet', {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the JWT token in the headers
        },
      });
      console.log('Wallet balance response:', response.data);
      localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
      setBalance(response.data.wallet.balance);
    } catch (err) {
      console.error('Error fetching wallet balance:', err);
      setError('Failed to fetch wallet balance');
    }
  };

  useEffect(() => {
    // Check if the wallet is already stored in localStorage
    const wallet = JSON.parse(localStorage.getItem('wallet'));
    if (wallet) {
      setBalance(wallet.balance);
    } else {
      fetchBalance();  // Fetch from API if no localStorage data
    }
  }, [user]);  // Fetch the balance when user changes

  // Handle adding funds
  const addFunds = async (e) => {
    e.preventDefault();
    if (!user) {
      console.log('No user in context');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);

    const token = localStorage.getItem('token');  // Get the token from localStorage
    if (!token) {
      console.error('No token found in localStorage');
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `/wallet/add-funds`,
        { amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the header
          },
        }
      );
      console.log('Add funds response:', response.data);
    
      setMessage('Funds added successfully.');
      setAmount('');
      fetchBalance();  // Update the balance after adding funds
    } catch (err) {
      console.error('Error adding funds:', err);
      setError(err.response?.data?.message || 'Failed to add funds');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Wallet</h2>
      {error && <div className="error">{error}</div>}
      <p>Balance: {typeof balance === 'number' ? `$${balance.toFixed(2)}` : 'Loading...'}</p>
      <form onSubmit={addFunds}>
        <label htmlFor="amount">Add Funds</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Funds'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Wallet;
