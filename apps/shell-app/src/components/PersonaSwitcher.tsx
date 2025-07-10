import React, { useState } from "react";
import { useConfiguration } from "../contexts/ConfigurationContext";

const PersonaSwitcher: React.FC = () => {
  const { state, changePersona, reloadConfiguration } = useConfiguration();
  const [isOpen, setIsOpen] = useState(false);

  const handlePersonaChange = async (personaId: string) => {
    await changePersona(personaId);
    setIsOpen(false);
  };

  const handleReloadConfig = () => {
    reloadConfiguration();
    setIsOpen(false);
  };

  const currentPersona = state.personas.find(
    (p) => p.id === state.currentPersona
  );

  const getPermissionBadgeColor = (permission: string) => {
    const colors = {
      read: "bg-green-100 text-green-800",
      write: "bg-blue-100 text-blue-800", 
      admin: "bg-purple-100 text-purple-800",
      system: "bg-red-100 text-red-800",
      root: "bg-gray-100 text-gray-800",
    };
    return colors[permission as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
      >
        <span>👤</span>
        <span>{currentPersona?.name || "Default User"}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-2 flex justify-between items-center border-b">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Switch Persona
              </span>
              <button
                onClick={handleReloadConfig}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                title="Reload configuration from file"
              >
                🔄 Reload Config
              </button>
            </div>
            
            {/* Current permissions display */}
            {state.permissions.length > 0 && (
              <div className="px-4 py-2 border-b bg-gray-50">
                <div className="text-xs font-medium text-gray-700 mb-1">Current Permissions:</div>
                <div className="flex flex-wrap gap-1">
                  {state.permissions.map((permission) => (
                    <span
                      key={permission}
                      className={`px-2 py-1 text-xs rounded-full ${getPermissionBadgeColor(permission)}`}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {state.personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handlePersonaChange(persona.id)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  persona.id === state.currentPersona
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700"
                }`}
              >
                <div className="font-medium">{persona.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {persona.description}
                </div>
              </button>
            ))}
          </div>

          {state.loading && (
            <div className="px-4 py-2 text-xs text-gray-500 border-t">
              Loading configuration...
            </div>
          )}

          {state.error && (
            <div className="px-4 py-2 text-xs text-red-500 border-t">
              Error: {state.error}
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default PersonaSwitcher;
