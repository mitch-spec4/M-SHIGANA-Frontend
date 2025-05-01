
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Transaction = {
  id: string;
  recipient: string;
  amount: number;
  currency: string;
  type: "send" | "receive";
  date: string;
  status: "completed" | "pending" | "failed";
};

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-amber-500";
      case "failed":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="p-0">
        {transactions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">No recent transactions</p>
          </div>
        ) : (
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div 
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full",
                      transaction.type === "send" ? "bg-red-100" : "bg-green-100"
                    )}
                  >
                    {transaction.type === "send" ? (
                      <ArrowUp className="h-5 w-5 text-red-500" />
                    ) : (
                      <ArrowDown className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.recipient}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p 
                    className={cn(
                      "font-semibold",
                      transaction.type === "send" ? "text-red-500" : "text-green-500"
                    )}
                  >
                    {transaction.type === "send" ? "-" : "+"}
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </p>
                  <p className={cn("text-xs", getStatusColor(transaction.status))}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
