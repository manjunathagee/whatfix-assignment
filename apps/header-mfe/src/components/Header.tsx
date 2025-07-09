import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

interface HeaderProps {
  title?: string
  cartCount?: number
  onCategoryClick?: (category: string) => void
  onCartClick?: () => void
  onUserSwitch?: (userId: string) => void
  currentUser?: string
}

const Header: React.FC<HeaderProps> = ({
  title = 'E-Commerce Dashboard',
  cartCount = 0,
  onCategoryClick = () => {},
  onCartClick = () => {},
  onUserSwitch = () => {},
  currentUser = 'default-user'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('')

  const categories = [
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'mobiles', name: 'Mobiles', icon: '📲' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
  ]

  const users = [
    { id: 'default-user', name: 'Default User', description: 'Standard user with basic access' },
    { id: 'power-user', name: 'Power User', description: 'Advanced user with additional features' },
    { id: 'admin-user', name: 'Admin User', description: 'Full access to all features' },
    { id: 'basic-user', name: 'Basic User', description: 'Limited access user' },
    { id: 'guest-user', name: 'Guest User', description: 'Temporary access user' },
  ]

  const currentUserInfo = users.find(user => user.id === currentUser) || users[0]

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategoryClick(category)
  }

  const handleUserSwitch = (userId: string) => {
    onUserSwitch(userId)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                {title}
              </h1>
            </div>
          </div>

          {/* Category Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <Button
                    variant={activeCategory === category.id ? "default" : "ghost"}
                    onClick={() => handleCategoryClick(category.id)}
                    className="flex items-center space-x-2"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </Button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="sm">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l1.5-8h11.5M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.28" />
              </svg>
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-bold min-w-[20px]">
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>👤</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{currentUserInfo.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[480px]" align="end">
                <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Switch User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {users.map((user) => (
                  <DropdownMenuItem
                    key={user.id}
                    onClick={() => handleUserSwitch(user.id)}
                    className={`cursor-pointer p-4 hover:bg-gray-50 ${
                      user.id === currentUser ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="font-medium text-base">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.description}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header