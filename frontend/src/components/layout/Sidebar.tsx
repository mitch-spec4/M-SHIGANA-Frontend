
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CreditCard, LogOut, Plus, Send, Settings, User, Users, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  open: boolean;
};

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
};

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start mb-1",
          active && "bg-ember-primary hover:bg-ember-secondary text-white"
        )}
      >
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
};

export function Sidebar({ open }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-card border-r transition-transform duration-300 ease-in-out md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-bold ember-gradient bg-clip-text text-transparent">M-SHIGANA</h2>
      </div>
      
      <div className="flex-1 overflow-auto py-4 px-3">
        <div className="mb-8">
          <Button className="w-full ember-gradient">
            <Send className="mr-2 h-5 w-5" /> Send Money
          </Button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">Dashboard</h3>
            <div className="space-y-1">
              <NavItem icon={Wallet} label="My Wallet" to="/dashboard" active={currentPath === '/dashboard'} />
              <NavItem icon={Send} label="Transfers" to="/transfers" active={currentPath === '/transfers'} />
              <NavItem icon={Users} label="Beneficiaries" to="/beneficiaries" active={currentPath === '/beneficiaries'} />
              <NavItem icon={CreditCard} label="Cards" to="/cards" active={currentPath === '/cards'} />
            </div>
          </div>

          <div>
            <h3 className="mb-2 px-4 text-xs font-medium text-muted-foreground">Account</h3>
            <div className="space-y-1">
              <NavItem icon={User} label="Profile" to="/profile" active={currentPath === '/profile'} />
              <NavItem icon={Settings} label="Settings" to="/settings" active={currentPath === '/settings'} />
              <NavItem icon={LogOut} label="Logout" to="/logout" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
