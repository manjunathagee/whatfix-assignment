import { useEffect, useState } from 'react';

// Define the shape of the global state that we need
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    theme: 'light' | 'dark';
    language: string;
  };
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

interface NavigationState {
  currentPath: string;
  activeModule: string;
  breadcrumbs: Array<{ label: string; path: string }>;
}

interface GlobalState {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  user: User | null;
  orders: Order[];
  navigation: NavigationState;
}

// Custom hook to access global state through event bus
export function useGlobalState() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    cartCount: 0,
    cartTotal: 0,
    user: null,
    orders: [],
    navigation: {
      currentPath: '/',
      activeModule: 'dashboard',
      breadcrumbs: [{ label: 'Dashboard', path: '/' }]
    }
  });

  useEffect(() => {
    // Get the event bus from the global window object
    const eventBus = (window as any).eventBus;
    
    if (!eventBus) {
      console.warn('[LeftNav MFE] EventBus not found on window');
      return;
    }

    // Subscribe to cart sync events
    const unsubscribeCart = eventBus.on('cart:sync', ({ cart }: { cart: CartItem[] }) => {
      const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      setState(prev => ({ ...prev, cart, cartCount, cartTotal }));
    });

    // Subscribe to user sync events
    const unsubscribeUser = eventBus.on('user:sync', ({ user }: { user: User | null }) => {
      setState(prev => ({ ...prev, user }));
    });

    // Subscribe to orders sync events
    const unsubscribeOrders = eventBus.on('orders:sync', ({ orders }: { orders: Order[] }) => {
      setState(prev => ({ ...prev, orders }));
    });

    // Subscribe to navigation sync events
    const unsubscribeNavigation = eventBus.on('navigation:sync', ({ navigation }: { navigation: NavigationState }) => {
      setState(prev => ({ ...prev, navigation }));
    });

    // Notify that this MFE is ready
    eventBus.emit('mfe:ready', { mfeName: 'left-nav-mfe' });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeCart();
      unsubscribeUser();
      unsubscribeOrders();
      unsubscribeNavigation();
    };
  }, []);

  return state;
}

// Custom hook to emit events to the global state
export function useGlobalActions() {
  const emitEvent = (eventType: string, data: any) => {
    const eventBus = (window as any).eventBus;
    if (eventBus) {
      eventBus.emit(eventType, data);
    }
  };

  return {
    // Navigation actions
    navigateTo: (path: string, module: string) => {
      emitEvent('navigation:change', { path, module });
    },
    
    // Cart actions
    addToCart: (item: CartItem) => {
      emitEvent('cart:add', { item });
    },
    
    removeFromCart: (itemId: string) => {
      emitEvent('cart:remove', { itemId });
    },
    
    // User actions
    loginUser: (user: User) => {
      emitEvent('user:login', { user });
    },
    
    logoutUser: () => {
      emitEvent('user:logout', undefined);
    }
  };
}

// Hook to use navigation specifically
export function useNavigation() {
  const { navigation, cartCount, orders } = useGlobalState();
  const actions = useGlobalActions();
  
  return {
    currentPath: navigation.currentPath,
    activeModule: navigation.activeModule,
    breadcrumbs: navigation.breadcrumbs,
    cartCount,
    ordersCount: orders.length,
    ...actions
  };
}

// Hook to use cart specifically
export function useCart() {
  const { cart, cartCount, cartTotal } = useGlobalState();
  const actions = useGlobalActions();
  
  return {
    items: cart,
    count: cartCount,
    total: cartTotal,
    ...actions
  };
}

// Hook to use user specifically
export function useUser() {
  const { user } = useGlobalState();
  const actions = useGlobalActions();
  
  return {
    user,
    isLoggedIn: !!user,
    ...actions
  };
}