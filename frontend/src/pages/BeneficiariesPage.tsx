
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BeneficiaryCard, AddBeneficiaryCard } from "@/components/transfer/BeneficiaryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock data
const MOCK_BENEFICIARIES = [
  { id: "1", name: "Jane Cooper", email: "jane@example.com" },
  { id: "2", name: "Michael Scott", email: "michael@example.com" },
  { id: "3", name: "Sarah Wilson", email: "sarah@example.com" },
  { id: "4", name: "Robert Johnson", email: "robert@example.com" },
  { id: "5", name: "Emily Davis", email: "emily@example.com" },
  { id: "6", name: "Alex Thompson", email: "alex@example.com" },
];

const BeneficiariesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredBeneficiaries = MOCK_BENEFICIARIES.filter(
    (beneficiary) =>
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMoney = (beneficiaryId: string) => {
    // In a real app, this would navigate to a transfer page with the beneficiary pre-selected
    navigate("/transfers");
  };

  const handleAddBeneficiary = () => {
    // In a real app, this would open a modal or navigate to an add beneficiary page
    alert("Add beneficiary feature would open here!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Beneficiaries</h1>
          <p className="text-muted-foreground">Manage your contacts for money transfers</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search beneficiaries..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleAddBeneficiary}
            className="ember-gradient text-white"
          >
            Add New
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBeneficiaries.map((beneficiary) => (
            <BeneficiaryCard
              key={beneficiary.id}
              beneficiary={beneficiary}
              onSend={handleSendMoney}
            />
          ))}
          <AddBeneficiaryCard onClick={handleAddBeneficiary} />
        </div>

        {filteredBeneficiaries.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-lg font-medium">No beneficiaries found</p>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BeneficiariesPage;
