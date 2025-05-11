import React from 'react';

function WalletAnalytics() {
  // Dummy wallet analytics data
  const walletData = [
    {
      id: 1,
      user: 'John Doe',
      balance: 4500,
      totalSent: 3000,
      totalReceived: 5000,
    },
    {
      id: 2,
      user: 'Jane Smith',
      balance: 3200,
      totalSent: 1000,
      totalReceived: 4200,
    },
    {
      id: 3,
      user: 'Michael Lee',
      balance: 800,
      totalSent: 700,
      totalReceived: 1500,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Wallet Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {walletData.map((wallet) => (
          <div
            key={wallet.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-bold mb-2">{wallet.user}</h3>
            <p>💰 Balance: ${wallet.balance.toLocaleString()}</p>
            <p>📤 Total Sent: ${wallet.totalSent.toLocaleString()}</p>
            <p>📥 Total Received: ${wallet.totalReceived.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletAnalytics;
