import type { DashboardConfig } from '../types'

export const fallbackConfig: DashboardConfig = {
  userId: 'fallback-user',
  version: '1.0.0',
  modules: [
    {
      name: 'dashboard',
      displayName: 'Dashboard',
      path: '/',
      component: 'Dashboard',
      enabled: true,
      order: 1,
      icon: '📊',
      description: 'Main dashboard view',
      category: 'core'
    },
    {
      name: 'profile',
      displayName: 'Profile',
      path: '/profile',
      component: 'Profile',
      enabled: true,
      order: 2,
      icon: '👤',
      description: 'User profile management',
      category: 'user'
    },
    {
      name: 'cart',
      displayName: 'Cart',
      path: '/cart',
      component: 'Cart',
      enabled: true,
      order: 3,
      icon: '🛒',
      description: 'Shopping cart',
      category: 'shopping'
    },
    {
      name: 'orders',
      displayName: 'Orders',
      path: '/orders',
      component: 'Orders',
      enabled: true,
      order: 4,
      icon: '📦',
      description: 'Order history',
      category: 'shopping'
    }
  ],
  theme: 'light',
  layout: 'default',
  lastUpdated: new Date().toISOString(),
  features: {
    analytics: false,
    personalization: false,
    notifications: true
  }
}