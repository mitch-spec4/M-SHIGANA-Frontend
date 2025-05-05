import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SendMoney from './pages/SendMoney'; // Fixed import for SendMoney
import Transactions from './pages/Transactions'; // Fixed import for Transactions

// Protected route component
const ProtectedRoute = ({ children }) => {
  const state = { isAuthenticated: true }; // Replace with actual authentication logic

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="*" element={<Navigate to="/send-money" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;