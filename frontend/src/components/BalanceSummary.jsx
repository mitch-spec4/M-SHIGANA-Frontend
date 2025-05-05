import { getBalance, getIncomeTotal, getExpenseTotal } from "../lib/transactionData";
import { ArrowUp, ArrowDown, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BalanceSummary = ({ userId }) => {
  const balance = getBalance(userId);
  const income = getIncomeTotal(userId);
  const expenses = getExpenseTotal(userId);

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-600">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-blue-600" />
            <span className="text-3xl font-bold text-blue-600">
              ${balance.toFixed(2)}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <div className="flex items-center text-sm text-gray-500">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                Income
              </div>
              <span className="mt-1 text-lg font-semibold text-green-600">
                ${income.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-sm text-gray-500">
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                Expenses
              </div>
              <span className="mt-1 text-lg font-semibold text-red-600">
                ${expenses.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-600">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Savings Rate</span>
              <span className="font-medium">
                {income > 0 ? Math.round(((income - expenses) / income) * 100) : 0}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Last Transaction</span>
              <span className="font-medium">May 1, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Pending</span>
              <span className="font-medium">1 transaction</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSummary;
