import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Admin: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            System administration and configuration
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-purple-900">
              System Administration
            </CardTitle>
            <Badge
              variant="secondary"
              className="mt-2 bg-purple-100 text-purple-800"
            >
              Coming Soon
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our comprehensive admin panel is under development! This
                powerful interface will provide complete system control,
                configuration management, and administrative tools.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🔧</div>
                  <h3 className="font-semibold text-gray-800">System Config</h3>
                  <p className="text-sm text-gray-600">
                    Global system settings
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-semibold text-gray-800">System Health</h3>
                  <p className="text-sm text-gray-600">
                    Performance monitoring
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🔒</div>
                  <h3 className="font-semibold text-gray-800">Security</h3>
                  <p className="text-sm text-gray-600">
                    Security configurations
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-semibold text-gray-800">Audit Trail</h3>
                  <p className="text-sm text-gray-600">Complete system logs</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🔄</div>
                  <h3 className="font-semibold text-gray-800">
                    Backup & Restore
                  </h3>
                  <p className="text-sm text-gray-600">Data management tools</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <p className="text-purple-800 font-medium">
                  🚀 Expected Release: Q2 2024
                </p>
                <p className="text-sm text-purple-600 mt-1">
                  Enterprise-grade administration tools with advanced security
                  features!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
