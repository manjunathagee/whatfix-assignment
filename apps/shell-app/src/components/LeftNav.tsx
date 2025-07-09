import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useConfiguration } from "../contexts/ConfigurationContext";
import LoadingSpinner from "./LoadingSpinner";

const LeftNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useConfiguration();
  const [showConfig, setShowConfig] = useState(false);

  if (state.loading) {
    return (
      <div className="flex-1 px-2 py-4 bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex-1 px-2 py-4 bg-white">
        <div className="text-red-600 text-sm p-2">
          Error loading navigation: {state.error}
        </div>
      </div>
    );
  }

  const navItems =
    state.config?.modules
      .filter((module) => module.enabled)
      .sort((a, b) => a.order - b.order)
      .map((module) => ({
        path: module.path,
        name: module.displayName,
        icon: module.icon || "📄",
        description: module.description,
      })) || [];

  return (
    <nav className="w-64 flex-shrink-0 px-2 py-4 bg-white">
      <div className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors truncate ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
            title={`${item.name} - ${item.description}`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>

      {/* Configuration Debug Info */}
      {state.config && (
        <div className="mt-4">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="w-full p-2 bg-gray-50 rounded text-xs text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span>👤 {state.currentPersona}</span>
              <span className="text-xs">{showConfig ? "▼" : "▶"}</span>
            </div>
          </button>
          {showConfig && (
            <div className="mt-1 p-2 bg-gray-50 rounded text-xs text-gray-500">
              <div>
                📊 {state.config.modules.filter((m) => m.enabled).length}{" "}
                modules
              </div>
              <div
                className="mt-1 text-xs truncate"
                title={
                  state.config.features &&
                  Object.entries(state.config.features)
                    .filter(([, enabled]) => enabled)
                    .map(([feature]) => feature)
                    .join(", ")
                }
              >
                {state.config.features &&
                  Object.entries(state.config.features)
                    .filter(([, enabled]) => enabled)
                    .map(([feature]) => feature)
                    .join(", ")}
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default LeftNav;
