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

interface GlobalState {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  user: User | null;
}

// Custom hook to access global state through event bus
export function useGlobalState() {
  const [state, setState] = useState<GlobalState>({
    cart: [],
    cartCount: 0,
    cartTotal: 0,
    user: null
  });

  useEffect(() => {
    // Get the event bus from the global window object
    const eventBus = (window as any).eventBus;
    
    if (!eventBus) {
      console.warn('[Cart MFE] EventBus not found on window');
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

    // Notify that this MFE is ready
    eventBus.emit('mfe:ready', { mfeName: 'cart-mfe' });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeCart();
      unsubscribeUser();
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
    // Cart actions
    addToCart: (item: CartItem) => {
      emitEvent('cart:add', { item });
    },
    
    removeFromCart: (itemId: string) => {
      emitEvent('cart:remove', { itemId });
    },
    
    updateCartItem: (itemId: string, quantity: number) => {
      emitEvent('cart:update', { itemId, quantity });
    },
    
    clearCart: () => {
      emitEvent('cart:clear', undefined);
    },
    
    // User actions
    loginUser: (user: User) => {
      emitEvent('user:login', { user });
    },
    
    logoutUser: () => {
      emitEvent('user:logout', undefined);
    },
    
    updateUser: (user: User) => {
      emitEvent('user:update', { user });
    },
    
    // Navigation actions
    navigateTo: (path: string, module: string) => {
      emitEvent('navigation:change', { path, module });
    },
    
    // Orders actions
    createOrder: (order: any) => {
      emitEvent('orders:add', { order });
    }
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