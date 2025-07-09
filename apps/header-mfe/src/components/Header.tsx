import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  title?: string;
  onCategoryClick?: (category: string) => void;
  onUserSwitch?: (userId: string) => void;
  currentUser?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "E-Commerce Dashboard",
  onCategoryClick = () => {},
  onUserSwitch = () => {},
  currentUser = "default-user",
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  // Navigation is handled by the shell app through onCategoryClick prop

  const categories = [
    { id: "home", name: "Home", icon: "🏠" },
    { id: "clothing", name: "Clothing", icon: "👕" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "mobiles", name: "Mobiles", icon: "📲" },
    { id: "books", name: "Books", icon: "📚" },
  ];

  const users = [
    {
      id: "default-user",
      name: "Default User",
      description: "Standard user with basic access",
    },
    {
      id: "power-user",
      name: "Power User",
      description: "Advanced user with additional features",
    },
    {
      id: "admin-user",
      name: "Admin User",
      description: "Full access to all features",
    },
    {
      id: "basic-user",
      name: "Basic User",
      description: "Limited access user",
    },
    {
      id: "guest-user",
      name: "Guest User",
      description: "Temporary access user",
    },
  ];

  const currentUserInfo =
    users.find((user) => user.id === currentUser) || users[0];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryClick(category);
    // Navigation is handled by the shell app through onCategoryClick prop
  };

  const handleUserSwitch = (userId: string) => {
    onUserSwitch(userId);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>
          </div>

          {/* Category Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <Button
                    variant={
                      activeCategory === category.id ? "default" : "ghost"
                    }
                    onClick={() => handleCategoryClick(category.id)}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </Button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>👤</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">
                    {currentUserInfo.name}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[480px] bg-white border shadow-lg"
                align="end"
              >
                <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Switch User
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {users.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onClick={() => handleUserSwitch(user.id)}
                    className={`cursor-pointer p-4 hover:bg-gray-50 ${
                      user.id === currentUser ? "bg-blue-50 text-blue-700" : ""
                    }`}
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="font-medium text-base">{user.name}</div>
                      <div className="text-sm text-gray-500">
                        {user.description}
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
