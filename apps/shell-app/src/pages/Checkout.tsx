import React, { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import LoadingSpinner from '../components/LoadingSpinner'

// @ts-ignore
const CheckoutComponent = React.lazy(() => import('checkoutMfe/Checkout'))

const CheckoutPage: React.FC = () => {
  return (
    <div className="flex-1">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <CheckoutComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default CheckoutPage