import React, { Suspense } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorBoundary from '../components/ErrorBoundary'

const RemoteProfile = React.lazy(() => import('profileMfe/Profile'))

const Profile: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <RemoteProfile />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Profile