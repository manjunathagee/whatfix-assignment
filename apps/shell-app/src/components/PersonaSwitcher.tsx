import React, { useState } from 'react'
import { useConfiguration } from '../contexts/ConfigurationContext'

const PersonaSwitcher: React.FC = () => {
  const { state, changePersona } = useConfiguration()
  const [isOpen, setIsOpen] = useState(false)

  const handlePersonaChange = async (personaId: string) => {
    await changePersona(personaId)
    setIsOpen(false)
  }

  const currentPersona = state.personas.find(p => p.id === state.currentPersona)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
      >
        <span>👤</span>
        <span>{currentPersona?.name || 'Default User'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Switch Persona
            </div>
            {state.personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handlePersonaChange(persona.id)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  persona.id === state.currentPersona
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                <div className="font-medium">{persona.name}</div>
                <div className="text-xs text-gray-500 mt-1">{persona.description}</div>
              </button>
            ))}
          </div>
          
          {state.loading && (
            <div className="px-4 py-2 text-xs text-gray-500 border-t">
              Loading configuration...
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default PersonaSwitcher