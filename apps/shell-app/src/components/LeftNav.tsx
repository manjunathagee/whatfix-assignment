import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const LeftNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', name: 'Dashboard', icon: '📊' },
    { path: '/profile', name: 'Profile', icon: '👤' },
    { path: '/cart', name: 'Cart', icon: '🛒' },
    { path: '/orders', name: 'Orders', icon: '📦' },
  ]

  return (
    <nav className="flex-1 px-2 py-4 bg-white">
      <div className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default LeftNav