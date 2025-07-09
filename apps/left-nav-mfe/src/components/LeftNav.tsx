import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useNavigation } from '@/hooks/useGlobalState'

interface NavigationItem {
  id: string
  label: string
  icon: string
  url: string
  badge?: number
}

interface LeftNavProps {
  items?: NavigationItem[]
  activeItem?: string
  onItemClick?: (item: NavigationItem) => void
}

const LeftNav: React.FC<LeftNavProps> = ({
  items,
  activeItem = 'profile',
  onItemClick = () => {}
}) => {
  const { cartCount, ordersCount, navigateTo } = useNavigation()
  const [selectedItem, setSelectedItem] = useState(activeItem)

  // Use dynamic navigation items with real state
  const defaultItems: NavigationItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: '👤',
      url: '/profile'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: '🛒',
      url: '/cart',
      badge: cartCount > 0 ? cartCount : undefined
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: '📦',
      url: '/orders',
      badge: ordersCount > 0 ? ordersCount : undefined
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: '❤️',
      url: '/wishlist',
      badge: 5
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      url: '/settings'
    },
    {
      id: 'help',
      label: 'Help',
      icon: '❓',
      url: '/help'
    }
  ]

  const navigationItems = items || defaultItems

  const handleItemClick = (item: NavigationItem) => {
    setSelectedItem(item.id)
    onItemClick(item)
    navigateTo(item.url, item.id)
  }

  return (
    <Card className="w-64 h-full rounded-none border-y-0 border-l-0 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Navigation</CardTitle>
      </CardHeader>
      <Separator />
      
      <CardContent className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={selectedItem === item.id ? "default" : "ghost"}
              onClick={() => handleItemClick(item)}
              className={cn(
                "w-full justify-start h-auto p-3 border-l-4 transition-colors",
                selectedItem === item.id 
                  ? "border-l-blue-500 bg-blue-50 text-blue-900" 
                  : "border-l-transparent hover:border-l-gray-300"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                
                {item.badge && (
                  <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs font-bold min-w-[20px]">
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </nav>
      </CardContent>
      
      <Separator />
      <div className="p-4">
        <div className="text-sm text-gray-500">
          Left Nav MFE v1.0
        </div>
      </div>
    </Card>
  )
}

export default LeftNav