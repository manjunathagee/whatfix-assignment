import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
  };
}

// Order interface
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Navigation state
export interface NavigationState {
  currentPath: string;
  activeModule: string;
  breadcrumbs: Array<{ label: string; path: string }>;
}

// Global store interface
export interface GlobalStore {
  // Cart state
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  
  // User state
  user: User | null;
  
  // Orders state
  orders: Order[];
  
  // Navigation state
  navigation: NavigationState;
  
  // Loading states
  isLoading: {
    cart: boolean;
    user: boolean;
    orders: boolean;
  };
  
  // Cart actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // User actions
  setUser: (user: User | null) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  
  // Orders actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  
  // Navigation actions
  setCurrentPath: (path: string) => void;
  setActiveModule: (module: string) => void;
  setBreadcrumbs: (breadcrumbs: NavigationState['breadcrumbs']) => void;
  
  // Loading actions
  setLoading: (type: keyof GlobalStore['isLoading'], loading: boolean) => void;
  
  // Utility actions
  getCartItemCount: () => number;
  getCartTotal: () => number;
  reset: () => void;
}

// Initial state
const initialState = {
  cart: [],
  cartCount: 0,
  cartTotal: 0,
  user: null,
  orders: [],
  navigation: {
    currentPath: '/',
    activeModule: 'dashboard',
    breadcrumbs: [{ label: 'Dashboard', path: '/' }]
  },
  isLoading: {
    cart: false,
    user: false,
    orders: false
  }
};

// Create the store with persistence
export const useGlobalStore = create<GlobalStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...initialState,
        
        // Cart actions
        addToCart: (item: CartItem) => {
          const currentCart = get().cart;
          const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
          
          if (existingItem) {
            set(state => ({
              cart: state.cart.map(cartItem =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              )
            }));
          } else {
            set(state => ({ cart: [...state.cart, item] }));
          }
          
          // Update computed values
          const newCart = get().cart;
          set({
            cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
            cartTotal: newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          });
        },
        
        removeFromCart: (itemId: string) => {
          set(state => ({
            cart: state.cart.filter(item => item.id !== itemId)
          }));
          
          // Update computed values
          const newCart = get().cart;
          set({
            cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
            cartTotal: newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          });
        },
        
        updateCartItemQuantity: (itemId: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeFromCart(itemId);
            return;
          }
          
          set(state => ({
            cart: state.cart.map(item =>
              item.id === itemId ? { ...item, quantity } : item
            )
          }));
          
          // Update computed values
          const newCart = get().cart;
          set({
            cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
            cartTotal: newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          });
        },
        
        clearCart: () => {
          set({ cart: [], cartCount: 0, cartTotal: 0 });
        },
        
        // User actions
        setUser: (user: User | null) => {
          set({ user });
        },
        
        updateUserPreferences: (preferences: Partial<User['preferences']>) => {
          set(state => ({
            user: state.user ? {
              ...state.user,
              preferences: { ...state.user.preferences, ...preferences }
            } : null
          }));
        },
        
        // Orders actions
        addOrder: (order: Order) => {
          set(state => ({
            orders: [...state.orders, order]
          }));
        },
        
        updateOrderStatus: (orderId: string, status: Order['status']) => {
          set(state => ({
            orders: state.orders.map(order =>
              order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
            )
          }));
        },
        
        // Navigation actions
        setCurrentPath: (path: string) => {
          set(state => ({
            navigation: { ...state.navigation, currentPath: path }
          }));
        },
        
        setActiveModule: (module: string) => {
          set(state => ({
            navigation: { ...state.navigation, activeModule: module }
          }));
        },
        
        setBreadcrumbs: (breadcrumbs: NavigationState['breadcrumbs']) => {
          set(state => ({
            navigation: { ...state.navigation, breadcrumbs }
          }));
        },
        
        // Loading actions
        setLoading: (type: keyof GlobalStore['isLoading'], loading: boolean) => {
          set(state => ({
            isLoading: { ...state.isLoading, [type]: loading }
          }));
        },
        
        // Utility actions
        getCartItemCount: () => {
          return get().cart.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        getCartTotal: () => {
          return get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        
        reset: () => {
          set(initialState);
        }
      }),
      {
        name: 'global-store',
        partialize: (state) => ({
          cart: state.cart,
          cartCount: state.cartCount,
          cartTotal: state.cartTotal,
          user: state.user,
          orders: state.orders,
          navigation: state.navigation
        })
      }
    )
  )
);

// Selectors for common use cases
export const useCartItems = () => useGlobalStore(state => state.cart);
export const useCartCount = () => useGlobalStore(state => state.cartCount);
export const useCartTotal = () => useGlobalStore(state => state.cartTotal);
export const useUser = () => useGlobalStore(state => state.user);
export const useOrders = () => useGlobalStore(state => state.orders);
export const useNavigation = () => useGlobalStore(state => state.navigation);
export const useLoadingState = () => useGlobalStore(state => state.isLoading);