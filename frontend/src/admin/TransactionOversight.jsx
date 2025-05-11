import React, { useEffect, useState } from 'react';

const TransactionOversight = () => {
  const [userTransactions, setUserTransactions] = useState({ sent: [], received: [] });
  const [adminTransactions, setAdminTransactions] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch user transaction history
  const fetchUserTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/history`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch user transactions');
      const data = await response.json();
      setUserTransactions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch admin transactions
  const fetchAdminTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/transactions`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch admin transactions');
      const data = await response.json();
      setAdminTransactions(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch profit data
  const fetchProfitData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/profit`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch profit data');
      const data = await response.json();
      setProfitData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch audit logs
  const fetchAuditLogs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/audit/logs`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch audit logs');
      const data = await response.json();
      setAuditLogs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUserTransactions(),
        fetchAdminTransactions(),
        fetchProfitData(),
        fetchAuditLogs(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading transaction oversight data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Transaction Oversight</h2>

      <section>
        <h3>User Transaction History</h3>
        <h4>Sent</h4>
        <ul>
          {userTransactions.sent.map(tx => (
            <li key={tx.id}>
              To: {tx.receiver_email} | Amount: ${tx.amount} | Date: {new Date(tx.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
        <h4>Received</h4>
        <ul>
          {userTransactions.received.map(tx => (
            <li key={tx.id}>
              From: {tx.sender_email} | Amount: ${tx.amount} | Date: {new Date(tx.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Admin Transactions</h3>
        <ul>
          {adminTransactions.map(tx => (
            <li key={tx.id}>
              User ID: {tx.user_id} | Amount: ${tx.amount} | Date: {new Date(tx.date).toLocaleString()} | Status: {tx.status}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Profit Data</h3>
        <ul>
          {profitData.map((item, index) => (
            <li key={index}>
              Date: {item.date} | Profit: ${item.profit.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Audit Logs</h3>
        <ul>
          {auditLogs.map(log => (
            <li key={log.id}>
              User ID: {log.user_id} | Action: {log.action} | Date: {new Date(log.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TransactionOversight;
