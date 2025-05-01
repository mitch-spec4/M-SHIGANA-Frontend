
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { SendMoneyForm } from "@/components/transfer/SendMoneyForm";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const MOCK_TRANSACTIONS = [
  { 
    id: "1", 
    recipient: "Jane Cooper", 
    amount: 250, 
    currency: "USD", 
    type: "send" as const, 
    date: "2023-04-01T10:30:00", 
    status: "completed" as const 
  },
  { 
    id: "2", 
    recipient: "Michael Scott", 
    amount: 100, 
    currency: "USD", 
    type: "receive" as const, 
    date: "2023-03-29T14:20:00", 
    status: "completed" as const 
  },
  { 
    id: "3", 
    recipient: "Sarah Wilson", 
    amount: 75, 
    currency: "USD", 
    type: "send" as const, 
    date: "2023-03-27T09:15:00", 
    status: "completed" as const 
  },
  { 
    id: "4", 
    recipient: "Robert Johnson", 
    amount: 150, 
    currency: "USD", 
    type: "send" as const, 
    date: "2023-03-25T16:45:00", 
    status: "pending" as const 
  },
];

const MOCK_ACTIVITY_DATA = [
  { date: "Jan", amount: 1200 },
  { date: "Feb", amount: 1900 },
  { date: "Mar", amount: 1500 },
  { date: "Apr", amount: 2400 },
  { date: "May", amount: 1800 },
  { date: "Jun", amount: 2800 },
  { date: "Jul", amount: 3200 },
];

const MOCK_BENEFICIARIES = [
  { id: "1", name: "Jane Cooper", email: "jane@example.com" },
  { id: "2", name: "Michael Scott", email: "michael@example.com" },
  { id: "3", name: "Sarah Wilson", email: "sarah@example.com" },
];

const DashboardPage = () => {
  const { toast } = useToast();
  const [showTransferForm, setShowTransferForm] = useState(false);

  const handleTransferSuccess = () => {
    setShowTransferForm(false);
    toast({
      title: "Money sent successfully!",
      description: "Your transfer has been initiated.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your account today.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BalanceCard balance={3250.75} />
          
          <div className="lg:col-span-2">
            <ActivityChart data={MOCK_ACTIVITY_DATA} />
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Send Money</h2>
            {showTransferForm ? (
              <SendMoneyForm 
                beneficiaries={MOCK_BENEFICIARIES}
                onSuccess={handleTransferSuccess}
              />
            ) : (
              <div className="bg-muted/30 border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">Quick Transfer</h3>
                <p className="text-muted-foreground mb-4">Send money to your contacts with just a few clicks</p>
                <button 
                  onClick={() => setShowTransferForm(true)}
                  className="ember-gradient text-white font-medium py-2 px-4 rounded-lg"
                >
                  Start a Transfer
                </button>
              </div>
            )}
          </div>

          <RecentTransactions transactions={MOCK_TRANSACTIONS} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
