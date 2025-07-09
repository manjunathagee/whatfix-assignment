import React, { Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'
import ErrorBoundary from './ErrorBoundary'
import { useConfiguration } from '../contexts/ConfigurationContext'

interface ModuleLoaderProps {
  module: string
}

const ModuleLoader: React.FC<ModuleLoaderProps> = ({ module }) => {
  const renderModule = () => {
    switch (module) {
      case 'profile':
        return <ProfileModule />
      case 'cart':
        return <CartModule />
      case 'orders':
        return <OrdersModule />
      case 'checkout':
        return <CheckoutModule />
      case 'payment':
        return <PaymentModule />
      default:
        return <DashboardModule />
    }
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {renderModule()}
      </Suspense>
    </ErrorBoundary>
  )
}

const DashboardModule = () => {
  const { state } = useConfiguration()
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">Welcome to Dashboard</h3>
          <p className="text-blue-700">This is the main dashboard view</p>
          {state.config && (
            <p className="text-blue-600 text-sm mt-2">
              Configured for: {state.currentPersona}
            </p>
          )}
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900">Available Modules</h3>
          <p className="text-green-700">
            {state.config?.modules.filter(m => m.enabled).length || 0} modules enabled
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900">Configuration</h3>
          <p className="text-purple-700">
            Theme: {state.config?.theme || 'loading...'}
          </p>
          <p className="text-purple-700">
            Layout: {state.config?.layout || 'loading...'}
          </p>
        </div>
      </div>
      
      {state.config?.features && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Enabled Features</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className={`p-2 rounded ${state.config.features.analytics ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Analytics: {state.config.features.analytics ? 'On' : 'Off'}
            </div>
            <div className={`p-2 rounded ${state.config.features.personalization ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Personalization: {state.config.features.personalization ? 'On' : 'Off'}
            </div>
            <div className={`p-2 rounded ${state.config.features.notifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Notifications: {state.config.features.notifications ? 'On' : 'Off'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ProfileModule = () => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900">Profile</h3>
        <p className="text-gray-700">Profile micro-frontend will be loaded here</p>
        <p className="text-sm text-gray-500 mt-2">This is a placeholder for the profile MFE</p>
      </div>
    </div>
  )
}

const CartModule = () => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900">Shopping Cart</h3>
        <p className="text-gray-700">Cart micro-frontend will be loaded here</p>
        <p className="text-sm text-gray-500 mt-2">This is a placeholder for the cart MFE</p>
      </div>
    </div>
  )
}

const OrdersModule = () => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900">Order History</h3>
        <p className="text-gray-700">Orders micro-frontend will be loaded here</p>
        <p className="text-sm text-gray-500 mt-2">This is a placeholder for the orders MFE</p>
      </div>
    </div>
  )
}

const CheckoutModule = () => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900">Checkout</h3>
        <p className="text-gray-700">Checkout micro-frontend will be loaded here</p>
        <p className="text-sm text-gray-500 mt-2">This is a placeholder for the checkout MFE</p>
      </div>
    </div>
  )
}

const PaymentModule = () => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900">Payment</h3>
        <p className="text-gray-700">Payment micro-frontend will be loaded here</p>
        <p className="text-sm text-gray-500 mt-2">This is a placeholder for the payment MFE</p>
      </div>
    </div>
  )
}

export default ModuleLoader