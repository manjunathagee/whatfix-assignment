import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const UserManagement: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Comprehensive user administration and permissions
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-green-900">
              User Management System
            </CardTitle>
            <Badge
              variant="secondary"
              className="mt-2 bg-green-100 text-green-800"
            >
              Coming Soon
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our advanced user management system is in development! This
                powerful module will provide complete control over user
                accounts, roles, permissions, and access management.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🔐</div>
                  <h3 className="font-semibold text-gray-800">
                    Role Management
                  </h3>
                  <p className="text-sm text-gray-600">
                    Create and manage user roles
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🛡️</div>
                  <h3 className="font-semibold text-gray-800">
                    Access Control
                  </h3>
                  <p className="text-sm text-gray-600">
                    Granular permission system
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-semibold text-gray-800">
                    User Analytics
                  </h3>
                  <p className="text-sm text-gray-600">
                    Activity monitoring and insights
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">👤</div>
                  <h3 className="font-semibold text-gray-800">User Profiles</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive user information
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🔍</div>
                  <h3 className="font-semibold text-gray-800">Audit Logs</h3>
                  <p className="text-sm text-gray-600">
                    Complete activity tracking
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">
                  🚀 Expected Release: Q2 2024
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Advanced security features and enterprise-grade user
                  management coming soon!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
