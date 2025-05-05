
import { Transaction } from "../lib/transactionData";
import TransactionCard from "./TransactionCard";

/**
 * @param {{ transactions: import("../lib/transactionData").Transaction[] }} props
 */
const TransactionList = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="py-12 px-4 text-center">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
