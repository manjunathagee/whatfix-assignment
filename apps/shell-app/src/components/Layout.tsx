import React, { Suspense } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { useConfiguration } from '../contexts/ConfigurationContext'

const RemoteHeader = React.lazy(() => import('headerMfe/Header'))
const RemoteLeftNav = React.lazy(() => import('leftNavMfe/LeftNav'))

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state, changePersona } = useConfiguration()

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category)
  }

  const handleCartClick = () => {
    console.log('Cart clicked')
  }

  const handleNavItemClick = (item: any) => {
    console.log('Navigation item clicked:', item)
  }

  const handleUserSwitch = (userId: string) => {
    console.log('User switch requested:', userId)
    changePersona(userId)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <RemoteHeader 
          title="Whatfix E-commerce"
          cartCount={3}
          onCategoryClick={handleCategoryClick}
          onCartClick={handleCartClick}
          onUserSwitch={handleUserSwitch}
          currentUser={state.currentPersona}
        />
      </Suspense>
      
      <div className="flex flex-1">
        <aside className="shadow-md bg-white">
          <Suspense fallback={<LoadingSpinner />}>
            <RemoteLeftNav 
              activeItem="profile"
              onItemClick={handleNavItemClick}
            />
          </Suspense>
        </aside>
        
        <main className="flex-1 p-6 bg-gray-50">
          <Suspense fallback={<LoadingSpinner />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default Layout