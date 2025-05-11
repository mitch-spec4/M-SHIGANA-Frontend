import React from 'react';

function AuditLogs() {
  // Dummy audit log data
  const logs = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Login',
      timestamp: '2025-05-01 09:12 AM',
      status: 'Success',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Transferred Funds',
      timestamp: '2025-05-01 10:30 AM',
      status: 'Success',
    },
    {
      id: 3,
      user: 'Admin',
      action: 'Deactivated User',
      timestamp: '2025-05-01 11:00 AM',
      status: 'Success',
    },
    {
      id: 4,
      user: 'Michael Lee',
      action: 'Login',
      timestamp: '2025-05-01 11:15 AM',
      status: 'Failed',
    },
  ];

  return (
    <div className="p-4 text-black">
      <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">User</th>
            <th className="border px-4 py-2 text-left">Action</th>
            <th className="border px-4 py-2 text-left">Timestamp</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="border px-4 py-2">{log.id}</td>
              <td className="border px-4 py-2">{log.user}</td>
              <td className="border px-4 py-2">{log.action}</td>
              <td className="border px-4 py-2">{log.timestamp}</td>
              <td
                className={`border px-4 py-2 font-medium ${
                  log.status === 'Success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {log.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditLogs;
