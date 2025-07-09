import React, { Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'
import ErrorBoundary from './ErrorBoundary'

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
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900">Welcome to Dashboard</h3>
          <p className="text-blue-700">This is the main dashboard view</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900">Recent Orders</h3>
          <p className="text-green-700">View your recent orders</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-900">Cart Summary</h3>
          <p className="text-purple-700">0 items in cart</p>
        </div>
      </div>
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