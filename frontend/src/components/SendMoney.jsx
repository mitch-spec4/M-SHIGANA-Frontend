import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../App';
import api from '../api';

const SendMoney = () => {
  const { token } = useContext(AuthContext);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      if (!token) {
        setErrorMessage('User not authenticated');
        return;
      }

      try {
        const response = await api.get('beneficiaries/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBeneficiaries(response.data.beneficiaries || response.data);
      } catch (error) {
        console.error('Error fetching beneficiaries:', error);
        setErrorMessage('Failed to fetch beneficiaries');
      }
    };

    fetchBeneficiaries();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!token) {
      setErrorMessage('User not authenticated');
      setLoading(false);
      return;
    }

    if (!receiverId || !amount || isNaN(amount) || Number(amount) <= 0) {
      setErrorMessage('Please select a beneficiary and enter a valid amount');
      setLoading(false);
      return;
    }

    try {
      await api.post(
        'transactions/send',
        {
          receiver_id: receiverId,
          amount: parseFloat(amount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage('Money sent successfully!');
      setReceiverId('');
      setAmount('');
    } catch (error) {
      console.error('Error sending money:', error);
      const errorMsg = error.response?.data?.message || 'Transaction failed';
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Send Money</h2>

      {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Select Beneficiary:
          <select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select --</option>
            {beneficiaries.map((b) => (
              <option key={b.id} value={b.beneficiary_user_id}>
                {b.full_name} ({b.account_number})
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
            min="0"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Money'}
        </button>
      </form>
    </div>
  );
};

export default SendMoney;
