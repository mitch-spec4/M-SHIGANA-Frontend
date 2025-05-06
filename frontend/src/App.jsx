import React, { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import axios from 'axios'

import Login from './components/Login'
import Register from './components/Register'
import Wallet from './components/Wallet'
import SendMoney from './components/SendMoney'
import Transactions from './components/Transactions'
import Beneficiaries from './components/Beneficiaries'
import Notifications from './components/Notifications'
import UserDashboard from './components/UserDashboard'

import AdminDashboard from './admin/AdminDashboard'
import UserManagement from './admin/UserManagement'
import TransactionOversight from './admin/TransactionOversight'
import WalletAnalytics from './admin/walletAnalytics'
import ProfitMonitoring from './admin/ProfitMonitoring'
import BeneficiaryOversight from './admin/BeneficiaryOversight'
import NotificationsAdmin from './admin/NotificationsAdmin'
import AuditLogs from './admin/AuditLogs'
import SystemConfiguration from './admin/SystemConfiguration'
import SupportTools from './admin/SupportTools'

export const AuthContext = React.createContext()

function NavBar() {
  const { user, logout } = React.useContext(AuthContext)
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav>
      <div><Link to="/">M-Shigana</Link></div>
      <div className="flex">
        {user ? (
          <>
            <span>Hello, {user.email}</span>
            <Link to="/wallet" className={isActive('/wallet') ? 'active' : ''}>Wallet</Link>
            <Link to="/send-money" className={isActive('/send-money') ? 'active' : ''}>Send Money</Link>
            <Link to="/transactions" className={isActive('/transactions') ? 'active' : ''}>Transactions</Link>
            <Link to="/beneficiaries" className={isActive('/beneficiaries') ? 'active' : ''}>Beneficiaries</Link>
            <Link to="/notifications" className={isActive('/notifications') ? 'active' : ''}>Notifications</Link>
            {user.role === 'admin' && (
              <Link to="/admin-dashboard">Admin</Link>
            )}
            <button onClick={logout} style={{ backgroundColor: '#e53e3e' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

function Home() {
  return (
    <div>
      <h1>Welcome to M-Shigana</h1>
      <p>A secure app for wallet and money transactions.</p>
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  )
}

function ProtectedRoute({ children, role }) {
  const { user } = React.useContext(AuthContext)

  if (!user) return <Navigate to="/login" />
  if (role && user.role !== role) return <Navigate to="/" />
  return children
}

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
      setToken(savedToken)
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
      } catch (error) {
        console.error('Failed to parse saved user from localStorage:', error)
        setUser(null)
      }
    }

    const interceptor = axios.interceptors.response.use(
      res => res,
      err => {
        if (err.response && err.response.status === 401) {
          logout()
        }
        return Promise.reject(err)
      }
    )

    return () => axios.interceptors.response.eject(interceptor)
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <NavBar />
      <div
        className="container"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1vbmV5JTIwdHJhbnNmZXJ8ZW58MHx8fHwxNjg3NTYyNzQ0&ixlib=rb-4.0.3&q=80&w=1080")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/wallet" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/wallet" /> : <Register />} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/send-money" element={<ProtectedRoute><SendMoney /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/beneficiaries" element={<ProtectedRoute><Beneficiaries /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

          {/* Admin nested routes with Outlet for better structure */}
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="user-management" element={<UserManagement />} />
            <Route path="transaction-oversight" element={<TransactionOversight />} />
            <Route path="wallet-analytics" element={<WalletAnalytics />} />
            <Route path="profit-monitoring" element={<ProfitMonitoring />} />
            <Route path="beneficiary-oversight" element={<BeneficiaryOversight />} />
            <Route path="notifications" element={<NotificationsAdmin />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="system-configuration" element={<SystemConfiguration />} />
            <Route path="support-tools" element={<SupportTools />} />
          </Route>

          <Route path="/user-dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
