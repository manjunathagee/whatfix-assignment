import { useGlobalStore } from "../stores/globalStore";
import { eventBus } from "./eventBus";

class StateSyncService {
  private initialized = false;
  private debug = false;

  constructor() {
    this.debug = import.meta.env.DEV;
  }

  initialize(): void {
    if (this.initialized) return;

    this.setupEventListeners();
    this.setupStoreSubscriptions();
    this.initialized = true;

    if (this.debug) {
      console.log("[StateSyncService] Initialized");
    }
  }

  private setupEventListeners(): void {
    // Cart synchronization
    eventBus.on("cart:add", ({ item }) => {
      useGlobalStore.getState().addToCart(item);
    });

    eventBus.on("cart:remove", ({ itemId }) => {
      useGlobalStore.getState().removeFromCart(itemId);
    });

    eventBus.on("cart:update", ({ itemId, quantity }) => {
      useGlobalStore.getState().updateCartItemQuantity(itemId, quantity);
    });

    eventBus.on("cart:clear", () => {
      useGlobalStore.getState().clearCart();
    });

    eventBus.on("cart:sync", ({ cart }) => {
      // Direct state update for sync
      useGlobalStore.setState({ cart });
    });

    // User synchronization
    eventBus.on("user:login", ({ user }) => {
      useGlobalStore.getState().setUser(user);
    });

    eventBus.on("user:logout", () => {
      useGlobalStore.getState().setUser(null);
    });

    eventBus.on("user:update", ({ user }) => {
      useGlobalStore.getState().setUser(user);
    });

    eventBus.on("user:sync", ({ user }) => {
      useGlobalStore.setState({ user });
    });

    // Navigation synchronization
    eventBus.on("navigation:change", ({ path, module }) => {
      useGlobalStore.getState().setCurrentPath(path);
      useGlobalStore.getState().setActiveModule(module);
    });

    eventBus.on("navigation:breadcrumb", ({ breadcrumbs }) => {
      useGlobalStore.getState().setBreadcrumbs(breadcrumbs);
    });

    eventBus.on("navigation:sync", ({ navigation }) => {
      useGlobalStore.setState({ navigation });
    });

    // Orders synchronization
    eventBus.on("orders:add", ({ order }) => {
      useGlobalStore.getState().addOrder(order);
    });

    eventBus.on("orders:update", ({ orderId, status }) => {
      useGlobalStore.getState().updateOrderStatus(orderId, status);
    });

    eventBus.on("orders:sync", ({ orders }) => {
      useGlobalStore.setState({ orders });
    });

    // General state synchronization
    eventBus.on("state:sync", ({ type, payload }) => {
      this.handleStateSync(type, payload);
    });

    // MFE lifecycle events
    eventBus.on("mfe:ready", ({ mfeName }) => {
      this.syncStateToMFE(mfeName);
    });

    eventBus.on("mfe:error", ({ mfeName, error }) => {
      console.error(`[StateSyncService] MFE ${mfeName} error:`, error);
    });
  }

  private setupStoreSubscriptions(): void {
    // Subscribe to cart changes
    useGlobalStore.subscribe(
      (state) => state.cart,
      (cart) => {
        // Broadcast cart changes to all MFEs
        eventBus.emit("cart:sync", { cart });

        if (this.debug) {
          console.log("[StateSyncService] Cart synced:", cart);
        }
      }
    );

    // Subscribe to user changes
    useGlobalStore.subscribe(
      (state) => state.user,
      (user) => {
        // Broadcast user changes to all MFEs
        eventBus.emit("user:sync", { user });

        if (this.debug) {
          console.log("[StateSyncService] User synced:", user);
        }
      }
    );

    // Subscribe to navigation changes
    useGlobalStore.subscribe(
      (state) => state.navigation,
      (navigation) => {
        // Broadcast navigation changes to all MFEs
        eventBus.emit("navigation:sync", { navigation });

        if (this.debug) {
          console.log("[StateSyncService] Navigation synced:", navigation);
        }
      }
    );

    // Subscribe to orders changes
    useGlobalStore.subscribe(
      (state) => state.orders,
      (orders) => {
        // Broadcast orders changes to all MFEs
        eventBus.emit("orders:sync", { orders });

        if (this.debug) {
          console.log("[StateSyncService] Orders synced:", orders);
        }
      }
    );
  }

  private handleStateSync(type: string, payload: any): void {
    switch (type) {
      case "cart":
        useGlobalStore.setState({ cart: payload });
        break;
      case "user":
        useGlobalStore.setState({ user: payload });
        break;
      case "navigation":
        useGlobalStore.setState({ navigation: payload });
        break;
      case "orders":
        useGlobalStore.setState({ orders: payload });
        break;
      default:
        console.warn(`[StateSyncService] Unknown state sync type: ${type}`);
    }
  }

  private syncStateToMFE(mfeName: string): void {
    const state = useGlobalStore.getState();

    // Send current state to newly ready MFE
    eventBus.emit("cart:sync", { cart: state.cart });
    eventBus.emit("user:sync", { user: state.user });
    eventBus.emit("navigation:sync", { navigation: state.navigation });
    eventBus.emit("orders:sync", { orders: state.orders });

    if (this.debug) {
      console.log(`[StateSyncService] Synced state to ${mfeName}`);
    }
  }

  // Manual sync methods for specific use cases
  syncCartToMFEs(): void {
    const cart = useGlobalStore.getState().cart;
    eventBus.emit("cart:sync", { cart });
  }

  syncUserToMFEs(): void {
    const user = useGlobalStore.getState().user;
    eventBus.emit("user:sync", { user });
  }

  syncNavigationToMFEs(): void {
    const navigation = useGlobalStore.getState().navigation;
    eventBus.emit("navigation:sync", { navigation });
  }

  syncOrdersToMFEs(): void {
    const orders = useGlobalStore.getState().orders;
    eventBus.emit("orders:sync", { orders });
  }

  syncAllStateToMFEs(): void {
    this.syncCartToMFEs();
    this.syncUserToMFEs();
    this.syncNavigationToMFEs();
    this.syncOrdersToMFEs();
  }

  // Utility methods
  getGlobalState() {
    return useGlobalStore.getState();
  }

  resetState(): void {
    useGlobalStore.getState().reset();
    this.syncAllStateToMFEs();
  }

  setDebug(enabled: boolean): void {
    this.debug = enabled;
    eventBus.setDebug(enabled);
  }
}

// Create and export singleton instance
export const stateSyncService = new StateSyncService();

// React hook for easy access
export function useStateSyncService() {
  return {
    syncCart: stateSyncService.syncCartToMFEs.bind(stateSyncService),
    syncUser: stateSyncService.syncUserToMFEs.bind(stateSyncService),
    syncNavigation:
      stateSyncService.syncNavigationToMFEs.bind(stateSyncService),
    syncOrders: stateSyncService.syncOrdersToMFEs.bind(stateSyncService),
    syncAll: stateSyncService.syncAllStateToMFEs.bind(stateSyncService),
    reset: stateSyncService.resetState.bind(stateSyncService),
    getState: stateSyncService.getGlobalState.bind(stateSyncService),
    setDebug: stateSyncService.setDebug.bind(stateSyncService),
  };
}

export default stateSyncService;
