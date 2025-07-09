import React, { Suspense } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorBoundary from '../components/ErrorBoundary'

const RemoteOrders = React.lazy(() => import('ordersMfe/Orders'))

const Orders: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <RemoteOrders />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Orders