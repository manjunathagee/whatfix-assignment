import type {
  DashboardConfig,
  ConfigurationResponse,
  ConfigurationCache,
  UserPersona,
  ConfigurationServiceOptions,
} from "../types";
import { fallbackConfig } from "./fallbackConfig";
import { configLoader } from "./configLoader";

class ConfigurationService {
  private cache: Map<string, ConfigurationCache> = new Map();
  private options: ConfigurationServiceOptions;

  constructor(options: ConfigurationServiceOptions = {}) {
    this.options = {
      baseUrl: "",
      cacheTTL: 5 * 60 * 1000, // 5 minutes
      retryAttempts: 3,
      enableValidation: true,
      ...options,
    };
  }

  async loadConfiguration(
    userId: string = "default-user"
  ): Promise<ConfigurationResponse> {
    try {
      // Check cache first
      const cached = this.getCachedConfig(userId);
      if (cached) {
        return {
          success: true,
          data: cached.config,
          timestamp: cached.timestamp,
          version: cached.version,
        };
      }

      // Load configuration using config loader
      const config = configLoader.loadConfiguration(userId);

      if (!config) {
        throw new Error(`Configuration not found for user: ${userId}`);
      }

      // Validate configuration if enabled
      if (this.options.enableValidation) {
        this.validateConfiguration(config);
      }

      // Cache the configuration
      this.cacheConfiguration(userId, config);

      return {
        success: true,
        data: config,
        timestamp: new Date().toISOString(),
        version: config.version,
      };
    } catch (error) {
      console.error("Configuration loading failed, using fallback:", error);

      // Use fallback configuration
      const config = { ...fallbackConfig, userId };
      this.cacheConfiguration(userId, config);

      return {
        success: true,
        data: config,
        timestamp: new Date().toISOString(),
        version: config.version,
      };
    }
  }

  async loadPersonas(): Promise<UserPersona[]> {
    try {
      return configLoader.loadPersonas();
    } catch (error) {
      console.error("Personas loading failed, using fallback:", error);
      return [
        {
          id: "default-user",
          name: "Default User",
          description: "Standard user with balanced features",
          configurationId: "config-default-user",
        },
        {
          id: "basic-user",
          name: "Basic User",
          description: "Simple user with minimal features",
          configurationId: "config-basic-user",
        },
        {
          id: "fallback-user",
          name: "Fallback User",
          description: "Fallback configuration when APIs fail",
          configurationId: "fallback",
        },
      ];
    }
  }

  private getCachedConfig(userId: string): ConfigurationCache | null {
    const cached = this.cache.get(userId);
    if (!cached) return null;

    const now = Date.now();
    const cacheAge = now - new Date(cached.timestamp).getTime();

    if (cacheAge > cached.ttl) {
      this.cache.delete(userId);
      return null;
    }

    return cached;
  }

  private cacheConfiguration(userId: string, config: DashboardConfig): void {
    const cacheEntry: ConfigurationCache = {
      config,
      timestamp: new Date().toISOString(),
      version: config.version,
      ttl: this.options.cacheTTL!,
    };
    this.cache.set(userId, cacheEntry);
  }

  private validateConfiguration(config: DashboardConfig): void {
    if (!config.userId || !config.version || !Array.isArray(config.modules)) {
      throw new Error("Invalid configuration format");
    }

    // Validate each module
    config.modules.forEach((module, index) => {
      if (
        !module.name ||
        !module.displayName ||
        !module.path ||
        !module.component
      ) {
        throw new Error(`Invalid module configuration at index ${index}`);
      }
    });
  }

  clearCache(userId?: string): void {
    if (userId) {
      this.cache.delete(userId);
    } else {
      this.cache.clear();
    }
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const configurationService = new ConfigurationService();
export default ConfigurationService;
