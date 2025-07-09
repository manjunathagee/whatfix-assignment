export interface ModuleConfig {
  name: string;
  displayName: string;
  path: string;
  component: string;
  enabled: boolean;
  order: number;
  permissions?: string[];
}

export interface DashboardConfig {
  userId: string;
  version: string;
  modules: ModuleConfig[];
  theme: 'light' | 'dark';
  layout: 'default' | 'compact';
  lastUpdated: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  compactMode: boolean;
  moduleOrder: string[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}