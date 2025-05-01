
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * @param {{ 
 *   onFilterChange: (filter: string) => void, 
 *   onSearch: (searchTerm: string) => void, 
 *   activeFilter: string 
 * }} props
 */
const TransactionFilters = ({ onFilterChange, onSearch, activeFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-white p-4 border-b">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="flex space-x-2">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeFilter === "all"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange("income")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeFilter === "income"
                ? "bg-green-100 text-green-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => onFilterChange("expense")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeFilter === "expense"
                ? "bg-red-100 text-red-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => onFilterChange("pending")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeFilter === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending
          </button>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
