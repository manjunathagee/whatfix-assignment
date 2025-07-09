export interface ModuleConfig {
  name: string;
  displayName: string;
  path: string;
  component: string;
  enabled: boolean;
  order: number;
  permissions?: string[];
  icon?: string;
  description?: string;
  category?: string;
}

export interface DashboardConfig {
  userId: string;
  version: string;
  modules: ModuleConfig[];
  theme: 'light';
  layout: 'default' | 'compact';
  lastUpdated: string;
  features?: {
    analytics: boolean;
    personalization: boolean;
    notifications: boolean;
  };
}

export interface UserPreferences {
  theme: 'light';
  compactMode: boolean;
  moduleOrder: string[];
  favoriteModules?: string[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// Configuration API Types
export interface ConfigurationResponse {
  success: boolean;
  data?: DashboardConfig;
  error?: string;
  timestamp: string;
  version: string;
}

export interface ConfigurationCache {
  config: DashboardConfig;
  timestamp: string;
  version: string;
  ttl: number;
}

export interface UserPersona {
  id: string;
  name: string;
  description: string;
  configurationId: string;
}

// API Configuration Types
export interface ApiEndpoints {
  config: string;
  userConfig: (userId: string) => string;
  validateConfig: string;
}

export interface ConfigurationServiceOptions {
  baseUrl?: string;
  cacheTTL?: number;
  retryAttempts?: number;
  enableValidation?: boolean;
}