import React, { Suspense } from 'react'
import Header from './Header'
import LeftNav from './LeftNav'
import LoadingSpinner from './LoadingSpinner'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>
      
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md">
          <Suspense fallback={<LoadingSpinner />}>
            <LeftNav />
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