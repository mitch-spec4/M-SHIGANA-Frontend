
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Plus, User } from "lucide-react";

type Beneficiary = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

type BeneficiaryCardProps = {
  beneficiary: Beneficiary;
  onSend: (id: string) => void;
};

export function BeneficiaryCard({ beneficiary, onSend }: BeneficiaryCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={beneficiary.avatarUrl} alt={beneficiary.name} />
            <AvatarFallback className="bg-ember-primary text-white">
              {getInitials(beneficiary.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{beneficiary.name}</p>
            <p className="text-sm text-muted-foreground truncate">{beneficiary.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3">
        <Button 
          variant="secondary"
          className="w-full bg-ember-primary text-white hover:bg-ember-secondary"
          onClick={() => onSend(beneficiary.id)}
        >
          <Send className="mr-2 h-4 w-4" />
          Send Money
        </Button>
      </CardFooter>
    </Card>
  );
}

export function AddBeneficiaryCard({ onClick }: { onClick: () => void }) {
  return (
    <Card className="overflow-hidden border-dashed hover:shadow-md transition-shadow">
      <CardContent className="p-5 flex flex-col items-center justify-center h-full text-center">
        <div className="mb-3 h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center">
          <User className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="font-medium">Add a New Beneficiary</p>
        <p className="text-sm text-muted-foreground mt-1">Add someone to send money to</p>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3">
        <Button 
          variant="outline"
          className="w-full"
          onClick={onClick}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </CardFooter>
    </Card>
  );
}
