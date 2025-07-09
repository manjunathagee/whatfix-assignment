import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              E-Commerce Dashboard
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Clothing
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Electronics
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Mobiles
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-gray-900">
              <span className="sr-only">View cart</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l1.5-8h11.5M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.28" />
              </svg>
              <span className="absolute -top-2 -right-2 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header