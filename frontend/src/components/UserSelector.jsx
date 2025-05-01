
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 */

const demoUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  {
    id: "2",
    name: "Sara Johnson",
    email: "sara@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
  },
  {
    id: "3",
    name: "Alex Wong",
    email: "alex@example.com", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  }
];



const UserSelector = ({ currentUser, onUserChange }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 pl-3 pr-2">
          <Avatar className="h-6 w-6 mr-1">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{currentUser.name}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch User</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {demoUsers.map((user) => (
          <DropdownMenuItem 
            key={user.id}
            className="cursor-pointer flex items-center gap-2 py-2"
            onClick={() => {
              onUserChange(user);
              setOpen(false);
            }}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserSelector, demoUsers };
