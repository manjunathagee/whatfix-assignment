import type { DashboardConfig, UserPersona } from "../types";

// Import unified configuration file
import unifiedConfig from "../../../../config/unified-config.json";

// Type definitions for normalized unified config
interface ModuleTemplate {
  name: string;
  displayName: string;
  path: string;
  component: string;
  icon: string;
  category: string;
  order: number;
}

interface ModuleGroup {
  template: string;
  displayName?: string;
  description?: string;
  permissions: string[];
  enabled?: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  theme: string;
  layout: string;
  moduleGroups: ModuleGroup[];
  featureTemplate: string;
  featureOverrides?: Record<string, boolean>;
}

interface UnifiedConfig {
  version: string;
  lastUpdated: string;
  moduleTemplates: Record<string, ModuleTemplate>;
  featureTemplates: Record<string, Record<string, boolean>>;
  roles: Record<string, Role>;
  globalSettings: {
    defaultRole: string;
    allowRoleSwitch: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordPolicy: Record<string, any>;
  };
}

// Convert unified config to personas format
const convertToPersonas = (config: UnifiedConfig): UserPersona[] => {
  return Object.values(config.roles).map(role => ({
    id: role.id,
    name: role.name,
    description: role.description,
    configurationId: role.id
  }));
};

// Convert normalized role to DashboardConfig format
const convertToDashboardConfig = (role: Role): DashboardConfig => {
  // Expand module groups using templates
  const modules = role.moduleGroups.map((moduleGroup) => {
    const template = (unifiedConfig.moduleTemplates as any)[moduleGroup.template];
    if (!template) {
      console.warn(`Module template '${moduleGroup.template}' not found`);
      return null;
    }
    
    return {
      name: template.name,
      displayName: moduleGroup.displayName || template.displayName,
      path: template.path,
      component: template.component,
      enabled: moduleGroup.enabled !== false, // Default to true
      order: template.order,
      icon: template.icon,
      description: moduleGroup.description || `${template.displayName} module`,
      category: template.category,
      permissions: moduleGroup.permissions
    };
  }).filter(Boolean); // Remove null entries

  // Expand features using template and overrides
  const baseFeatures = (unifiedConfig.featureTemplates as any)[role.featureTemplate] || {};
  const features = {
    ...baseFeatures,
    ...role.featureOverrides
  };

  return {
    userId: role.id,
    version: unifiedConfig.version,
    modules: modules as any[],
    theme: role.theme as any,
    layout: role.layout as any,
    lastUpdated: unifiedConfig.lastUpdated,
    features
  };
};

// Cache for converted configurations
let configCache: Record<string, DashboardConfig> = {};
let personasCache: UserPersona[] = [];

// Initialize cache
const initializeCache = () => {
  configCache = {};
  personasCache = convertToPersonas(unifiedConfig);
  
  Object.keys(unifiedConfig.roles).forEach(roleId => {
    configCache[roleId] = convertToDashboardConfig((unifiedConfig.roles as any)[roleId]);
  });
};

// Initialize on first load
initializeCache();

export const configLoader = {
  /**
   * Load configuration for a specific user
   */
  loadConfiguration(userId: string): DashboardConfig | null {
    return configCache[userId] || null;
  },

  /**
   * Load all available personas
   */
  loadPersonas(): UserPersona[] {
    return personasCache;
  },

  /**
   * Get list of available user IDs
   */
  getAvailableUserIds(): string[] {
    return Object.keys(configCache);
  },

  /**
   * Check if a user configuration exists
   */
  hasConfiguration(userId: string): boolean {
    return userId in configCache;
  },

  /**
   * Get unified configuration
   */
  getUnifiedConfig(): UnifiedConfig {
    return unifiedConfig;
  },

  /**
   * Get role permissions
   */
  getRolePermissions(userId: string): string[] {
    return (unifiedConfig.roles as any)[userId]?.permissions || [];
  },

  /**
   * Get global settings
   */
  getGlobalSettings() {
    return unifiedConfig.globalSettings;
  },

  /**
   * Reload configuration (for hot reload functionality)
   */
  reloadConfiguration(): void {
    initializeCache();
  },

  /**
   * Get default role
   */
  getDefaultRole(): string {
    return unifiedConfig.globalSettings.defaultRole;
  },

  /**
   * Check if role switching is allowed
   */
  isRoleSwitchAllowed(): boolean {
    return unifiedConfig.globalSettings.allowRoleSwitch;
  }
};

export default configLoader;
