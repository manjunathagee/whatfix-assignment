import React from 'react'
import { useLocation } from 'react-router-dom'
import ModuleLoader from '../components/ModuleLoader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {module.charAt(0).toUpperCase() + module.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ModuleLoader module={module} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard