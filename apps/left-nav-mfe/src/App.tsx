import { useState } from 'react'
import LeftNav from './components/LeftNav'

function App() {
  const [selectedItem, setSelectedItem] = useState('profile')

  const handleItemClick = (item: any) => {
    setSelectedItem(item.id)
    console.log('Navigation item clicked:', item)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <LeftNav
        activeItem={selectedItem}
        onItemClick={handleItemClick}
      />
      
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Left Navigation MFE
          </h2>
          <p className="text-gray-600 mb-8">
            This is a standalone left navigation micro-frontend that can be integrated into the shell application.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li>• Dynamic navigation items with icons</li>
              <li>• Badge indicators for items with counts</li>
              <li>• Active state management</li>
              <li>• Theme support (light/dark)</li>
              <li>• Responsive design</li>
              <li>• Click handlers for navigation</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Selected Item:</strong> {selectedItem}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
