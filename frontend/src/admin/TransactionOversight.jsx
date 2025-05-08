import React from 'react';

function TransactionOversight() {

  const transactions = [
    {
      id: 1,
      user: 'John Doe',
      amount: 2500,
      status: 'Successful',
      date: '2025-05-01',
    },
    {
      id: 2,
      user: 'Jane Smith',
      amount: 1500,
      status: 'Pending',
      date: '2025-05-02',
    },
    {
      id: 3,
      user: 'Michael Lee',
      amount: 500,
      status: 'Failed',
      date: '2025-05-03',
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transaction Oversight</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">User</th>
            <th className="border px-4 py-2 text-left">Amount</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className="border px-4 py-2">{tx.id}</td>
              <td className="border px-4 py-2">{tx.user}</td>
              <td className="border px-4 py-2">${tx.amount.toLocaleString()}</td>
              <td className="border px-4 py-2">{tx.status}</td>
              <td className="border px-4 py-2">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionOversight;
