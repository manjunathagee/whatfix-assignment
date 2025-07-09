import React, { useState } from 'react'

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
  theme?: 'light' | 'dark'
}

const LeftNav: React.FC<LeftNavProps> = ({
  items = [
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
      badge: 3
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: '📦',
      url: '/orders',
      badge: 2
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
  ],
  activeItem = 'profile',
  onItemClick = () => {},
  theme = 'light'
}) => {
  const [selectedItem, setSelectedItem] = useState(activeItem)

  const handleItemClick = (item: NavigationItem) => {
    setSelectedItem(item.id)
    onItemClick(item)
  }

  const baseClasses = theme === 'dark' 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900'

  const itemClasses = theme === 'dark'
    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'

  const activeClasses = theme === 'dark'
    ? 'bg-gray-800 text-white border-blue-400'
    : 'bg-blue-50 text-blue-900 border-blue-500'

  return (
    <div className={`w-64 h-full ${baseClasses} border-r border-gray-200 flex flex-col`}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors duration-200 border-l-4 ${
                  selectedItem === item.id
                    ? activeClasses
                    : `${itemClasses} border-transparent`
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Left Nav MFE v1.0
        </div>
      </div>
    </div>
  )
}

export default LeftNav