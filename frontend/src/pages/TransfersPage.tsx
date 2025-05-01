
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SendMoneyForm } from "@/components/transfer/SendMoneyForm";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const MOCK_BENEFICIARIES = [
  { id: "1", name: "Jane Cooper", email: "jane@example.com" },
  { id: "2", name: "Michael Scott", email: "michael@example.com" },
  { id: "3", name: "Sarah Wilson", email: "sarah@example.com" },
  { id: "4", name: "Robert Johnson", email: "robert@example.com" },
];

const MOCK_TRANSFERS = [
  {
    id: "1",
    recipient: "Jane Cooper",
    amount: 250,
    currency: "USD",
    date: "2023-04-01T10:30:00",
    status: "completed",
    reference: "TR-78945612"
  },
  {
    id: "2",
    recipient: "Michael Scott",
    amount: 100,
    currency: "USD",
    date: "2023-03-29T14:20:00",
    status: "completed",
    reference: "TR-12348765"
  },
  {
    id: "3",
    recipient: "Sarah Wilson",
    amount: 75,
    currency: "USD",
    date: "2023-03-27T09:15:00",
    status: "completed",
    reference: "TR-36925814"
  },
  {
    id: "4",
    recipient: "Robert Johnson",
    amount: 150,
    currency: "USD",
    date: "2023-03-25T16:45:00",
    status: "pending",
    reference: "TR-25814736"
  },
];

const TransfersPage = () => {
  const { toast } = useToast();

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleTransferSuccess = () => {
    toast({
      title: "Transfer initiated!",
      description: "Your money transfer has been successfully initiated.",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-amber-100 text-amber-800",
      failed: "bg-red-100 text-red-800",
    };
    
    return (
      <span 
        className={`px-2 py-1 rounded text-xs font-medium ${
          statusClasses[status as keyof typeof statusClasses]
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Transfers</h1>
          <p className="text-muted-foreground">Send money and view your transfer history</p>
        </div>

        <Tabs defaultValue="new">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New Transfer</TabsTrigger>
            <TabsTrigger value="history">Transfer History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="pt-4">
            <SendMoneyForm
              beneficiaries={MOCK_BENEFICIARIES}
              onSuccess={handleTransferSuccess}
            />
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <Card>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left font-medium">Recipient</th>
                        <th className="h-12 px-4 text-left font-medium">Amount</th>
                        <th className="h-12 px-4 text-left font-medium">Date</th>
                        <th className="h-12 px-4 text-left font-medium">Reference</th>
                        <th className="h-12 px-4 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_TRANSFERS.map((transfer) => (
                        <tr key={transfer.id} className="border-b">
                          <td className="p-4 align-middle">{transfer.recipient}</td>
                          <td className="p-4 align-middle">
                            {formatCurrency(transfer.amount, transfer.currency)}
                          </td>
                          <td className="p-4 align-middle">{formatDate(transfer.date)}</td>
                          <td className="p-4 align-middle">{transfer.reference}</td>
                          <td className="p-4 align-middle">
                            {getStatusBadge(transfer.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TransfersPage;
