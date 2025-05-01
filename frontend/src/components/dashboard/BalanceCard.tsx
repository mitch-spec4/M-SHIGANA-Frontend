
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BalanceCardProps = {
  balance: number;
  currency?: string;
};

export function BalanceCard({ balance, currency = "USD" }: BalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return (
    <Card className={cn("overflow-hidden")}>
      <div className="ember-gradient p-1">
        <CardContent className="bg-card p-6 rounded-t-lg">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-muted-foreground">Total Balance</h3>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
              <p className="text-xs text-muted-foreground mt-1">Available in your wallet</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-card p-0 rounded-b-lg">
          <Button className="w-full rounded-none py-6 ember-gradient" size="lg">
            <Plus className="mr-2 h-4 w-4" /> Add Funds
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
