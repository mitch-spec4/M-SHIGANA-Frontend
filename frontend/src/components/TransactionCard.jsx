import { Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";

const TransactionCard = ({ transaction }) => {
  const isIncome = transaction.type === "income";
  const isPending = transaction.status === "pending";
  
  return (
    <div className="flex items-center py-3 px-4 border-b last:border-0 hover:bg-gray-50 transition-colors duration-150">
      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
        isIncome ? 'bg-green-100' : 'bg-red-100'
      }`}>
        {isIncome ? (
          <ArrowUp className="h-5 w-5 text-green-600" />
        ) : (
          <ArrowDown className="h-5 w-5 text-red-600" />
        )}
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-gray-900">{transaction.description}</h3>
          <span className={`font-medium ${
            isIncome ? 'text-green-600' : 'text-red-600'
          }`}>
            {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
          </span>
        </div>
        
        <div className="flex justify-between mt-1">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
              {transaction.category}
            </span>
            {isPending && (
              <span className="ml-2 text-xs text-yellow-700 bg-yellow-100 rounded-full px-2 py-0.5">
                Pending
              </span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            {format(new Date(transaction.date), 'MMM d, yyyy')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
