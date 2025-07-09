import React, { useState } from 'react'

interface HeaderProps {
  title?: string
  cartCount?: number
  onCategoryClick?: (category: string) => void
  onCartClick?: () => void
  onUserSwitch?: (userId: string) => void
  currentUser?: string
  theme?: 'light' | 'dark'
}

const Header: React.FC<HeaderProps> = ({
  title = 'E-Commerce Dashboard',
  cartCount = 0,
  onCategoryClick = () => {},
  onCartClick = () => {},
  onUserSwitch = () => {},
  currentUser = 'default-user',
  theme = 'light'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

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
    setIsUserMenuOpen(false)
  }

  const isDark = theme === 'dark'
  const headerBg = isDark ? 'bg-gray-900' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200'
  const hoverColor = isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'

  return (
    <header className={`${headerBg} shadow-sm border-b ${borderColor}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className={`text-xl font-bold ${textColor}`}>
                {title}
              </h1>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="hidden md:flex space-x-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? isDark
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-100 text-blue-700'
                    : `${textColor} ${hoverColor}`
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </nav>

          {/* Cart and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className={`p-2 rounded-md ${textColor} ${hoverColor} transition-colors`}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className={`relative p-2 rounded-md ${textColor} ${hoverColor} transition-colors`}
            >
              <span className="sr-only">View cart</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l1.5-8h11.5M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.28" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-md ${textColor} ${hoverColor} transition-colors`}>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isDark 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>👤</span>
                <span className="hidden sm:inline">{currentUserInfo.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Switch User
                    </div>
                    {users.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleUserSwitch(user.id)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          user.id === currentUser
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{user.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Overlay to close dropdown when clicking outside */}
              {isUserMenuOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                />
              )}
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header