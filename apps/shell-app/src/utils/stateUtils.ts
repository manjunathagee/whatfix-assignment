import { useGlobalStore } from '../stores/globalStore';
import { eventBus } from '../services/eventBus';
import type { CartItem, User, Order } from '../stores/globalStore';

// Utility functions for state management across MFEs
export const stateUtils = {
  // Cart utilities
  cart: {
    add: (item: CartItem) => {
      eventBus.emit('cart:add', { item });
    },
    
    remove: (itemId: string) => {
      eventBus.emit('cart:remove', { itemId });
    },
    
    update: (itemId: string, quantity: number) => {
      eventBus.emit('cart:update', { itemId, quantity });
    },
    
    clear: () => {
      eventBus.emit('cart:clear', undefined);
    },
    
    get: () => {
      return useGlobalStore.getState().cart;
    },
    
    getCount: () => {
      return useGlobalStore.getState().cartCount;
    },
    
    getTotal: () => {
      return useGlobalStore.getState().cartTotal;
    },
    
    findItem: (itemId: string): CartItem | undefined => {
      return useGlobalStore.getState().cart.find(item => item.id === itemId);
    },
    
    hasItem: (itemId: string): boolean => {
      return useGlobalStore.getState().cart.some(item => item.id === itemId);
    },
    
    isEmpty: (): boolean => {
      return useGlobalStore.getState().cart.length === 0;
    }
  },

  // User utilities
  user: {
    login: (user: User) => {
      eventBus.emit('user:login', { user });
    },
    
    logout: () => {
      eventBus.emit('user:logout', undefined);
    },
    
    update: (user: User) => {
      eventBus.emit('user:update', { user });
    },
    
    get: (): User | null => {
      return useGlobalStore.getState().user;
    },
    
    isLoggedIn: (): boolean => {
      return useGlobalStore.getState().user !== null;
    },
    
    getId: (): string | null => {
      return useGlobalStore.getState().user?.id || null;
    },
    
    getName: (): string | null => {
      return useGlobalStore.getState().user?.name || null;
    },
    
    getEmail: (): string | null => {
      return useGlobalStore.getState().user?.email || null;
    },
    
    getAvatar: (): string | null => {
      return useGlobalStore.getState().user?.avatar || null;
    },
    
    getPreferences: () => {
      return useGlobalStore.getState().user?.preferences || null;
    },
    
    updatePreferences: (preferences: Partial<User['preferences']>) => {
      const currentUser = useGlobalStore.getState().user;
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          preferences: { ...currentUser.preferences, ...preferences }
        };
        eventBus.emit('user:update', { user: updatedUser });
      }
    }
  },

  // Navigation utilities
  navigation: {
    navigate: (path: string, module: string) => {
      eventBus.emit('navigation:change', { path, module });
    },
    
    setBreadcrumbs: (breadcrumbs: Array<{ label: string; path: string }>) => {
      eventBus.emit('navigation:breadcrumb', { breadcrumbs });
    },
    
    getCurrentPath: (): string => {
      return useGlobalStore.getState().navigation.currentPath;
    },
    
    getActiveModule: (): string => {
      return useGlobalStore.getState().navigation.activeModule;
    },
    
    getBreadcrumbs: () => {
      return useGlobalStore.getState().navigation.breadcrumbs;
    },
    
    isActive: (module: string): boolean => {
      return useGlobalStore.getState().navigation.activeModule === module;
    },
    
    isCurrentPath: (path: string): boolean => {
      return useGlobalStore.getState().navigation.currentPath === path;
    }
  },

  // Orders utilities
  orders: {
    add: (order: Order) => {
      eventBus.emit('orders:add', { order });
    },
    
    updateStatus: (orderId: string, status: Order['status']) => {
      eventBus.emit('orders:update', { orderId, status });
    },
    
    get: (): Order[] => {
      return useGlobalStore.getState().orders;
    },
    
    getById: (orderId: string): Order | undefined => {
      return useGlobalStore.getState().orders.find(order => order.id === orderId);
    },
    
    getByStatus: (status: Order['status']): Order[] => {
      return useGlobalStore.getState().orders.filter(order => order.status === status);
    },
    
    getByUserId: (userId: string): Order[] => {
      return useGlobalStore.getState().orders.filter(order => order.userId === userId);
    },
    
    getCount: (): number => {
      return useGlobalStore.getState().orders.length;
    },
    
    getTotal: (orderId: string): number => {
      const order = useGlobalStore.getState().orders.find(order => order.id === orderId);
      return order?.total || 0;
    },
    
    hasOrders: (): boolean => {
      return useGlobalStore.getState().orders.length > 0;
    },
    
    getRecentOrders: (count: number = 5): Order[] => {
      return useGlobalStore.getState().orders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, count);
    }
  },

  // Loading utilities
  loading: {
    set: (type: 'cart' | 'user' | 'orders', loading: boolean) => {
      useGlobalStore.getState().setLoading(type, loading);
    },
    
    get: (type: 'cart' | 'user' | 'orders'): boolean => {
      return useGlobalStore.getState().isLoading[type];
    },
    
    getAll: () => {
      return useGlobalStore.getState().isLoading;
    },
    
    isAnyLoading: (): boolean => {
      const loading = useGlobalStore.getState().isLoading;
      return loading.cart || loading.user || loading.orders;
    }
  },

  // General utilities
  general: {
    reset: () => {
      useGlobalStore.getState().reset();
    },
    
    getState: () => {
      return useGlobalStore.getState();
    },
    
    subscribe: (callback: (state: any) => void) => {
      return useGlobalStore.subscribe(callback);
    },
    
    // Utility to create a cart item
    createCartItem: (
      id: string,
      name: string,
      price: number,
      quantity: number = 1,
      options?: Partial<CartItem>
    ): CartItem => {
      return {
        id,
        name,
        price,
        quantity,
        ...options
      };
    },
    
    // Utility to create a user
    createUser: (
      id: string,
      name: string,
      email: string,
      options?: Partial<User>
    ): User => {
      return {
        id,
        name,
        email,
        ...options
      };
    },
    
    // Utility to create an order
    createOrder: (
      id: string,
      userId: string,
      items: CartItem[],
      options?: Partial<Order>
    ): Order => {
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return {
        id,
        userId,
        items,
        total,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...options
      };
    },
    
    // Utility to format currency
    formatCurrency: (amount: number, currency: string = 'USD'): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
      }).format(amount);
    },
    
    // Utility to generate unique ID
    generateId: (): string => {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
  }
};

// React hooks for easier usage in components
export const useStateUtils = () => stateUtils;

// Export individual utilities for convenience
export const {
  cart: cartUtils,
  user: userUtils,
  navigation: navigationUtils,
  orders: ordersUtils,
  loading: loadingUtils,
  general: generalUtils
} = stateUtils;

export default stateUtils;