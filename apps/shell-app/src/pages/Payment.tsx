import React, { Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'
import LoadingSpinner from '../components/LoadingSpinner'

// @ts-ignore
const PaymentComponent = React.lazy(() => import('paymentMfe/Payment'))

const PaymentPage: React.FC = () => {
  return (
    <div className="flex-1">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <PaymentComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default PaymentPage