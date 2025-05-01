import { useState } from "react";
import BalanceSummary from "./BalanceSummary";
import TransactionList from "./TransactionList";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";
import { transactions } from "../lib/transactionData";
import { UserSelector, demoUsers } from "./UserSelector";

const TransactionDashboard = () => {
  const [currentUser, setCurrentUser] = useState(demoUsers[0]);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Filter transactions by current user first
  const [userTransactions, setUserTransactions] = useState(
    transactions.filter(t => t.userId === currentUser.id)
  );
  const [filteredTransactions, setFilteredTransactions] = useState(userTransactions);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setFilteredTransactions(userTransactions);
    } else if (filter === "income") {
      setFilteredTransactions(userTransactions.filter(t => t.type === "income"));
    } else if (filter === "expense") {
      setFilteredTransactions(userTransactions.filter(t => t.type === "expense"));
    } else if (filter === "pending") {
      setFilteredTransactions(userTransactions.filter(t => t.status === "pending"));
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      handleFilterChange(activeFilter);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results = userTransactions.filter(t => 
      t.description.toLowerCase().includes(term) || 
      t.category.toLowerCase().includes(term)
    );
    
    setFilteredTransactions(results);
  };

  const handleUserChange = (user) => {
    setCurrentUser(user);
    
    // Update transactions for the new user
    const newUserTransactions = transactions.filter(t => t.userId === user.id);
    setUserTransactions(newUserTransactions);
    
    // Apply the current filter to the new user's transactions
    if (activeFilter === "all") {
      setFilteredTransactions(newUserTransactions);
    } else if (activeFilter === "income") {
      setFilteredTransactions(newUserTransactions.filter(t => t.type === "income"));
    } else if (activeFilter === "expense") {
      setFilteredTransactions(newUserTransactions.filter(t => t.type === "expense"));
    } else if (activeFilter === "pending") {
      setFilteredTransactions(newUserTransactions.filter(t => t.status === "pending"));
    }
  };
  
  const handleTransactionAdded = () => {
    // Refresh the transaction lists
    const updatedUserTransactions = transactions.filter(t => t.userId === currentUser.id);
    setUserTransactions(updatedUserTransactions);
    
    // Apply current filter
    handleFilterChange(activeFilter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaction Archive Vault</h1>
          <UserSelector currentUser={currentUser} onUserChange={handleUserChange} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance summary section */}
          <div className="lg:col-span-1">
            <BalanceSummary userId={currentUser.id} />
            <div className="mt-4">
              <TransactionForm 
                userId={currentUser.id} 
                onTransactionAdded={handleTransactionAdded} 
              />
            </div>
          </div>
          
          {/* Transactions section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <TransactionFilters 
                onFilterChange={handleFilterChange}
                activeFilter={activeFilter}
                onSearch={handleSearch}
              />
              <TransactionList transactions={filteredTransactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDashboard;
