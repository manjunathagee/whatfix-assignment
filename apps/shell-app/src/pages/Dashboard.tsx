import React from 'react'
import { useLocation } from 'react-router-dom'
import ModuleLoader from '../components/ModuleLoader'

const Dashboard: React.FC = () => {
  const location = useLocation()

  const getModuleForPath = (path: string) => {
    switch (path) {
      case '/profile':
        return 'profile'
      case '/cart':
        return 'cart'
      case '/orders':
        return 'orders'
      case '/checkout':
        return 'checkout'
      case '/payment':
        return 'payment'
      default:
        return 'dashboard'
    }
  }

  const module = getModuleForPath(location.pathname)

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {module.charAt(0).toUpperCase() + module.slice(1)}
        </h2>
        
        <ModuleLoader module={module} />
      </div>
    </div>
  )
}

export default Dashboard