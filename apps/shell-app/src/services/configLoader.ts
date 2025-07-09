import type { DashboardConfig, UserPersona } from "../types";

// Import all configuration files
import defaultUserConfig from "../../../../config/config-default-user.json";
import powerUserConfig from "../../../../config/config-power-user.json";
import adminUserConfig from "../../../../config/config-admin-user.json";
import basicUserConfig from "../../../../config/config-basic-user.json";
import guestUserConfig from "../../../../config/config-guest-user.json";
import personasData from "../../../../config/personas.json";

// Configuration mapping
const configMap: Record<string, DashboardConfig> = {
  "default-user": defaultUserConfig as DashboardConfig,
  "power-user": powerUserConfig as DashboardConfig,
  "admin-user": adminUserConfig as DashboardConfig,
  "basic-user": basicUserConfig as DashboardConfig,
  "guest-user": guestUserConfig as DashboardConfig,
};

// Personas data
const personas: UserPersona[] = personasData.personas;

export const configLoader = {
  /**
   * Load configuration for a specific user
   */
  loadConfiguration(userId: string): DashboardConfig | null {
    return configMap[userId] || null;
  },

  /**
   * Load all available personas
   */
  loadPersonas(): UserPersona[] {
    return personas;
  },

  /**
   * Get list of available user IDs
   */
  getAvailableUserIds(): string[] {
    return Object.keys(configMap);
  },

  /**
   * Check if a user configuration exists
   */
  hasConfiguration(userId: string): boolean {
    return userId in configMap;
  },
};

export default configLoader;
