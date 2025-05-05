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
import WalletAnalytics from './admin/WalletAnalytics'
import ProfitMonitoring from './admin/ProfitMonitoring'
import BeneficiaryOversight from './admin/BeneficiaryOversight'
import NotificationsAdmin from './admin/NotificationsAdmin'
import AuditLogs from './admin/AuditLogs'
import SystemConfiguration from './admin/SystemConfiguration'
import SupportTools from './admin/SupportTools'

