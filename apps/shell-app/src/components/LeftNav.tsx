import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useConfiguration } from '../contexts/ConfigurationContext'
import LoadingSpinner from './LoadingSpinner'

const LeftNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useConfiguration()

  if (state.loading) {
    return (
      <div className="flex-1 px-2 py-4 bg-white">
        <LoadingSpinner />
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="flex-1 px-2 py-4 bg-white">
        <div className="text-red-600 text-sm p-2">
          Error loading navigation: {state.error}
        </div>
      </div>
    )
  }

  const navItems = state.config?.modules
    .filter(module => module.enabled)
    .sort((a, b) => a.order - b.order)
    .map(module => ({
      path: module.path,
      name: module.displayName,
      icon: module.icon || '📄',
      description: module.description,
    })) || []

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
            title={item.description}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
      
      {/* Configuration Debug Info */}
      {state.config && (
        <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-500">
          <div>User: {state.currentPersona}</div>
          <div>Theme: {state.config.theme}</div>
          <div>Layout: {state.config.layout}</div>
        </div>
      )}
    </nav>
  )
}

export default LeftNav