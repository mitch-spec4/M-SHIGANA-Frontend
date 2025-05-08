import React from 'react';

function ProfitMonitoring() {
  // Dummy profit/revenue data
  const profitData = [
    {
      month: 'January',
      revenue: 12000,
      expenses: 8000,
      profit: 4000,
    },
    {
      month: 'February',
      revenue: 15000,
      expenses: 9500,
      profit: 5500,
    },
    {
      month: 'March',
      revenue: 18000,
      expenses: 10000,
      profit: 8000,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Profit/Revenue Monitoring</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Month</th>
            <th className="border px-4 py-2 text-left">Revenue</th>
            <th className="border px-4 py-2 text-left">Expenses</th>
            <th className="border px-4 py-2 text-left">Profit</th>
          </tr>
        </thead>
        <tbody>
          {profitData.map((data, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{data.month}</td>
              <td className="border px-4 py-2">${data.revenue.toLocaleString()}</td>
              <td className="border px-4 py-2">${data.expenses.toLocaleString()}</td>
              <td className="border px-4 py-2 font-medium text-green-600">
                ${data.profit.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfitMonitoring;
