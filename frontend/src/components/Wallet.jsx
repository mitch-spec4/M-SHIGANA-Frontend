import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';

axios.defaults.baseURL = 'http://localhost:5000';  // Note: removed `/api` if your Flask routes start directly from /

function Wallet() {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const fetchBalance = async () => {
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      const response = await axios.get('/wallet/me', {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const localWallet = localStorage.getItem('wallet');
    if (localWallet) {
      try {
        const parsed = JSON.parse(localWallet);
        setBalance(parsed.balance);
      } catch (err) {
        fetchBalance();
      }
    } else {
      fetchBalance();
    }
  }, [user]);

  const addFunds = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!token) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        '/wallet/add-funds',
        { amount: parseFloat(amount) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Add funds response:', response.data);
      setMessage(response.data.message || 'Funds added successfully.');
      setAmount('');
      fetchBalance();  // Refresh balance
    } catch (err) {
      console.error('Error adding funds:', err);
      setError(err.response?.data?.message || 'Failed to add funds');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Wallet</h2>

      {error && <div className="text-red-600 mb-2">{error}</div>}
      {message && <div className="text-green-600 mb-2">{message}</div>}

      <p className="mb-4 text-lg">
        Balance:{' '}
        {typeof balance === 'number' ? `$${balance.toFixed(2)}` : 'Loading...'}
      </p>

      <form onSubmit={addFunds} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
            Add Funds
          </label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Adding...' : 'Add Funds'}
        </button>
      </form>
    </div>
  );
}

export default Wallet;
