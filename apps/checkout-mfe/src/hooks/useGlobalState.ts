import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface User {
  name: string
  email: string
  avatar: string
}

interface GlobalState {
  cart: CartItem[]
  user: User | null
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setUser: (user: User) => void
  getCartCount: () => number
  getCartTotal: () => number
}

const useGlobalState = create<GlobalState>()(
  persist(
    (set, get) => ({
      cart: [],
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://github.com/shadcn.png'
      },
      
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          return {
            cart: state.cart.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
                : cartItem
            )
          }
        } else {
          return {
            cart: [...state.cart, { ...item, quantity: item.quantity || 1 }]
          }
        }
      }),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      })),
      
      clearCart: () => set({ cart: [] }),
      
      setUser: (user) => set({ user }),
      
      getCartCount: () => {
        const state = get()
        return state.cart.reduce((total, item) => total + item.quantity, 0)
      },
      
      getCartTotal: () => {
        const state = get()
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'global-store',
      partialize: (state) => ({ cart: state.cart, user: state.user })
    }
  )
)

export default useGlobalState