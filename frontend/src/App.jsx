import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

// User components
import Login from "./components/Login";
import Register from "./components/Register";
import Wallet from "./components/Wallet";
import SendMoney from "./components/SendMoney";
import Transactions from "./components/Transactions";
import Beneficiaries from "./components/Beneficiaries";
import Notifications from "./components/Notifications";
import UserDashboard from "./components/UserDashboard";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer"; 


// Admin components
import AdminDashboard from "./admin/AdminDashboard";
import UserManagement from "./admin/UserManagement";
import TransactionOversight from "./admin/TransactionOversight";
import WalletAnalytics from "./admin/walletAnalytics";
import ProfitMonitoring from "./admin/ProfitMonitoring";
import BeneficiaryOversight from "./admin/BeneficiaryOversight";
import NotificationsAdmin from "./admin/NotificationsAdmin";
import AuditLogs from "./admin/AuditLogs";
import SystemConfiguration from "./admin/SystemConfiguration";
import SupportTools from "./admin/SupportTools";

export const AuthContext = React.createContext();

function NavBar({ theme, toggleTheme }) {
  const { user, logout } = React.useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div>
        <Link to="/">M-Shigana</Link>
      </div>
      <div className="flex">
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {user ? (
          <>
            <span>Hello, {user.name}</span>
            <Link to="/wallet" className={isActive("/wallet") ? "active" : ""}>
              Wallet
            </Link>
            <Link
              to="/send-money"
              className={isActive("/send-money") ? "active" : ""}
            >
              Send Money
            </Link>
            <Link
              to="/transactions"
              className={isActive("/transactions") ? "active" : ""}
            >
              Transactions
            </Link>
            <Link
              to="/beneficiaries"
              className={isActive("/beneficiaries") ? "active" : ""}
            >
              Beneficiaries
            </Link>
            <Link
              to="/notifications"
              className={isActive("/notifications") ? "active" : ""}
            >
              Notifications
            </Link>
            {user.role === "admin" && <Link to="/admin-dashboard">Admin</Link>}
            <button onClick={logout} style={{ backgroundColor: "#e53e3e" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div
      className="home"
      style={{
        backgroundImage: "url('/src/assets/background_image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem 1rem",
        color: "#fff",
      }}
    >
      {/* Overlay for better readability */}
      <div style={{ backgroundColor: "hsla(60, 7.70%, 97.50%, 0.60)", padding: "2rem", borderRadius: "1rem" }}>
        <h1>Welcome to M-Shigana</h1>
        <p>A secure and simple app for wallet and money transactions.</p>

        

        {/* Features and About */}
        <Features />
      </div>

      <About />
    </div>
  );
}


function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function ProtectedRoute({ children, role }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (
      savedToken &&
      savedUser &&
      savedUser !== "undefined" &&
      savedUser !== "null"
    ) {
      setToken(savedToken);
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      } catch (error) {
        console.error("Failed to parse saved user from localStorage:", error);
        setUser(null);
      }
    }

    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const login = (userData, token, walletData) => {
    setUser(userData);
    setToken(token);
    setWallet(walletData);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setWallet(null);
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/wallet" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/wallet" /> : <Register />}
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <Wallet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send-money"
            element={
              <ProtectedRoute>
                <SendMoney />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/beneficiaries"
            element={
              <ProtectedRoute>
                <Beneficiaries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="user-management" element={<UserManagement />} />
            <Route
              path="transaction-oversight"
              element={<TransactionOversight />}
            />
            <Route path="wallet-analytics" element={<WalletAnalytics />} />
            <Route path="profit-monitoring" element={<ProfitMonitoring />} />
            <Route
              path="beneficiary-oversight"
              element={<BeneficiaryOversight />}
            />
            <Route path="notifications" element={<NotificationsAdmin />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route
              path="system-configuration"
              element={<SystemConfiguration />}
            />
            <Route path="support-tools" element={<SupportTools />} />
          </Route>
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> {/* ✅ Add Footer at the bottom of all routes */}
      </div>
    </AuthContext.Provider>
  );
}

export default App;