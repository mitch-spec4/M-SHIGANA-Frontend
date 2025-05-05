import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <ul>
          <li><Link to="user-management">User Management</Link></li>
          <li><Link to="transaction-oversight">Transaction Oversight</Link></li>
          <li><Link to="wallet-analytics">Wallet Analytics</Link></li>
          <li><Link to="profit-monitoring">Profit/Revenue Monitoring</Link></li>
          <li><Link to="beneficiary-oversight">Beneficiary Oversight</Link></li>
          <li><Link to="notifications">Notifications</Link></li>
          <li><Link to="audit-logs">Audit Logs</Link></li>
          <li><Link to="system-configuration">System Configuration</Link></li>
          <li><Link to="support-tools">Support Tools</Link></li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

export default AdminDashboard