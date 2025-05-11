import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WalletAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [wallets, setWallets] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsersAndWallets = async () => {
      try {
        const userRes = await axios.get('/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(userRes.data.users);

        const walletsData = {};
        for (let user of userRes.data.users) {
          const walletRes = await axios.get('/admin/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          walletsData[user.id] = walletRes.data.balance;
        }
        setWallets(walletsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersAndWallets();
  }, [token]);

  if (loading) return <div>Loading wallet analytics...</div>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Wallet Analytics</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">User ID</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Wallet Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {wallets[user.id] !== undefined ? `$${wallets[user.id].toFixed(2)}` : 'Loading...'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletAnalytics;
