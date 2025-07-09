import React, { useState } from "react";
import { User, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/hooks/useGlobalState";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  url: string;
  badge?: number;
}

interface LeftNavProps {
  items?: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
}

const LeftNav: React.FC<LeftNavProps> = ({
  items,
  activeItem = "profile",
  onItemClick = () => {},
}) => {
  const { cartCount, ordersCount, navigateTo } = useNavigation();
  const [selectedItem, setSelectedItem] = useState(activeItem);

  // Use dynamic navigation items with real state
  const defaultItems: NavigationItem[] = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      url: "/profile",
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      url: "/cart",
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: "orders",
      label: "Orders",
      icon: Package,
      url: "/orders",
      badge: ordersCount > 0 ? ordersCount : undefined,
    },
  ];

  const navigationItems = items || defaultItems;

  const handleItemClick = (item: NavigationItem) => {
    setSelectedItem(item.id);
    onItemClick(item);
    navigateTo(item.url, item.id);
  };

  return (
    <Card className="w-64 h-full rounded-2xl shadow-xl border-0 bg-gradient-to-b from-blue-50 via-white to-white flex flex-col">
      <CardHeader className="pb-3 border-none">
        <CardTitle className="text-lg font-bold text-blue-800 tracking-wide">
          Navigation
        </CardTitle>
      </CardHeader>
      <Separator />

      <CardContent className="flex-1 p-4">
        <nav className="space-y-4">
          {" "}
          {/* Increased vertical gap */}
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedItem === item.id ? "default" : "ghost"}
              onClick={() => handleItemClick(item)}
              className={cn(
                "w-full justify-start h-auto p-3 transition-all rounded-lg font-semibold text-base flex items-center",
                selectedItem === item.id
                  ? "bg-blue-200 text-blue-900 shadow-lg border-2 border-blue-500"
                  : "hover:bg-blue-50 hover:text-blue-800",
                "group"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-5">
                  {" "}
                  {/* Increased gap */}
                  <item.icon className="w-12 h-12 text-blue-700 group-hover:text-blue-900 transition-colors" />{" "}
                  {/* Larger icon */}
                  <span className="font-medium text-lg ml-2">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="h-5 w-5 p-0 flex items-center justify-center text-xs font-bold min-w-[20px]"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </nav>
      </CardContent>
      <Separator />
      <div className="p-4 flex flex-col items-center">
        <div className="text-xs text-gray-400 font-mono tracking-wide bg-gray-100 rounded px-2 py-1 mt-2 shadow-sm">
          Left Nav MFE v1.0
        </div>
      </div>
    </Card>
  );
};

export default LeftNav;
