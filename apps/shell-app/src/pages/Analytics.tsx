import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Analytics: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive analytics and reporting tools
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">
              Analytics Module
            </CardTitle>
            <Badge
              variant="secondary"
              className="mt-2 bg-blue-100 text-blue-800"
            >
              Coming Soon
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                We're working hard to bring you powerful analytics capabilities!
                This module will provide comprehensive insights into your data,
                user behavior, and business metrics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-semibold text-gray-800">
                    Data Visualization
                  </h3>
                  <p className="text-sm text-gray-600">
                    Interactive charts and graphs
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-semibold text-gray-800">
                    Performance Metrics
                  </h3>
                  <p className="text-sm text-gray-600">
                    Real-time KPI tracking
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-2xl mb-2">📋</div>
                  <h3 className="font-semibold text-gray-800">
                    Custom Reports
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tailored insights for your needs
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 font-medium">
                  🚀 Expected Release: Q2 2024
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  Stay tuned for updates and early access notifications!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
