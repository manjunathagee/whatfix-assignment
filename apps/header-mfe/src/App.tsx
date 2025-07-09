import { useState } from 'react'
import Header from './components/Header'

function App() {
  const [cartCount, setCartCount] = useState(3)

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Header MFE Demo"
        onCategoryClick={handleCategoryClick}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Header Micro-Frontend
          </h2>
          <p className="text-gray-600 mb-8">
            This is a standalone header micro-frontend that can be integrated into the shell application.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• Dynamic category navigation</li>
              <li>• Shopping cart with count indicator</li>
              <li>• Responsive design for mobile and desktop</li>
              <li>• Theme support (light/dark)</li>
              <li>• Search and notifications</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Cart Count:</strong> {cartCount} items
            </p>
            <button
              onClick={() => setCartCount(cartCount + 1)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Item to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
