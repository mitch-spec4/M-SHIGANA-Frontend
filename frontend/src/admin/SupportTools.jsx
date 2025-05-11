import React, { useState, useEffect } from 'react';
import { Users, BarChart3, FileText, TicketCheck, RefreshCw } from 'lucide-react';

// Reusable Status Indicator
const StatusIndicator = ({ status }) => {
  const config = {
    healthy: { color: 'bg-green-500', text: 'Healthy' },
    warning: { color: 'bg-amber-500', text: 'Warning' },
    error: { color: 'bg-red-500', text: 'Error' },
    pending: { color: 'bg-blue-500', text: 'Pending' },
  }[status] || { color: 'bg-gray-500', text: 'Unknown' };

  return (
    <div className="flex items-center gap-2">
      <div className={`${config.color} w-2 h-2 rounded-full`}></div>
      <span>{config.text}</span>
    </div>
  );
};

// System Diagnostics Tab
const SystemDiagnostics = () => {
  const [systemStatus, setSystemStatus] = useState({
    cpu: { usage: 45, status: 'healthy' },
    memory: { usage: 70, status: 'warning' },
    disk: { usage: 85, status: 'error' },
  });

  const refreshStatus = () => {
    setSystemStatus({
      cpu: { usage: Math.floor(Math.random() * 100), status: 'healthy' },
      memory: { usage: Math.floor(Math.random() * 100), status: 'warning' },
      disk: { usage: Math.floor(Math.random() * 100), status: 'error' },
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">System Diagnostics</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(systemStatus).map(([key, { usage, status }]) => (
          <div key={key} className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-medium capitalize">{key}</h3>
            <p className="text-sm">Usage: {usage}%</p>
            <StatusIndicator status={status} />
          </div>
        ))}
      </div>
      <button
        onClick={refreshStatus}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <RefreshCw className="inline-block mr-2" /> Refresh Status
      </button>
    </div>
  );
};

// User Management Tab
const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', status: 'active' },
    { id: 2, name: 'Jane Smith', status: 'inactive' },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Log Viewer Tab
const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const mockLogs = Array(10).fill(0).map((_, i) => ({
      id: i + 1,
      timestamp: new Date(Date.now() - i * 60000).toLocaleString(),
      level: ['info', 'warning', 'error'][i % 3],
      message: `Log message ${i + 1}`,
    }));
    setLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Log Viewer</h2>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Timestamp</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Level</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map(log => (
            <tr key={log.id}>
              <td className="px-6 py-4">{log.timestamp}</td>
              <td className="px-6 py-4">{log.level}</td>
              <td className="px-6 py-4">{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Support Tools Component
const SupportTools = () => {
  const [activeTab, setActiveTab] = useState('diagnostics');
  const tabs = [
    { id: 'diagnostics', name: 'Diagnostics', component: <SystemDiagnostics /> },
    { id: 'users', name: 'User Management', component: <UserManagement /> },
    { id: 'logs', name: 'Log Viewer', component: <LogViewer /> },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <nav className="flex border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 ${
              activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
      <div className="p-4">{tabs.find(tab => tab.id === activeTab)?.component}</div>
    </div>
  );
};

export default SupportTools;