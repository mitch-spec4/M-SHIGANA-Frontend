import React from 'react';
import { useAuth } from '../context/AuthContext';
// import BalanceCard from '../components/dashboard/BalanceCard';
// import RecentTransactions from '../features/transactions/components/RecentTransactions';
// import UsageGraph from '../features/transactions/components/UsageGraph';
import { getTransactionsForUser } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { Send, PieChart, CreditCard } from 'lucide-react';
// import Card from '../components/ui/Card';

const Transaction = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const currentUser = state.user;
  
  if (!currentUser) return null;
  
  const transactions = getTransactionsForUser(currentUser.id);
  
  // Calculate recent activity (last 30 days)
  const calcRecentActivity = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentTransactions = transactions.filter(
      t => new Date(t.timestamp) >= thirtyDaysAgo
    );
    
    let incoming = 0;
    let outgoing = 0;
    
    recentTransactions.forEach(t => {
      if (t.sender_id === currentUser.id) {
        outgoing += t.amount;
      } else {
        incoming += t.amount;
      }
    });
    
    return { incoming, outgoing };
  };
  
  const recentActivity = calcRecentActivity();
  
  const quickActions = [
    {
      icon: <Send size={20} />,
      title: 'Send Money',
      description: 'Transfer to anyone',
      onClick: () => navigate('/send-money'),
    },
    {
      icon: <CreditCard size={20} />,
      title: 'Top Up',
      description: 'Add funds to account',
      onClick: () => {},
    },
    {
      icon: <PieChart size={20} />,
      title: 'Analytics',
      description: 'View spending habits',
      onClick: () => navigate('/analytics'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {currentUser.name}</h1>
        <p className="text-gray-600">Here's an overview of your finances</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <BalanceCard recentActivity={recentActivity} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="hover:bg-gray-50 cursor-pointer transition-colors p-5"
              onClick={action.onClick}
            >
              <div className="flex items-center">
                <div className="bg-primary-100 p-3 rounded-full mr-4 text-primary-600">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <UsageGraph transactions={transactions} currentUser={currentUser} />
        </div>
        <div>
          <RecentTransactions transactions={transactions} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Transaction;