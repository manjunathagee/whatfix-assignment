import React, { Suspense } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorBoundary from '../components/ErrorBoundary'

const RemoteCart = React.lazy(() => import('cartMfe/Cart'))

const Cart: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <RemoteCart />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Cart