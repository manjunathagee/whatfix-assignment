// Event types for inter-MFE communication
export interface EventTypes {
  // Cart events
  'cart:add': { item: any };
  'cart:remove': { itemId: string };
  'cart:update': { itemId: string; quantity: number };
  'cart:clear': void;
  'cart:sync': { cart: any[] };
  
  // User events
  'user:login': { user: any };
  'user:logout': void;
  'user:update': { user: any };
  'user:sync': { user: any };
  
  // Navigation events
  'navigation:change': { path: string; module: string };
  'navigation:breadcrumb': { breadcrumbs: any[] };
  'navigation:sync': { navigation: any };
  
  // Orders events
  'orders:add': { order: any };
  'orders:update': { orderId: string; status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' };
  'orders:sync': { orders: any[] };
  
  // General events
  'state:sync': { type: string; payload: any };
  'mfe:ready': { mfeName: string };
  'mfe:error': { mfeName: string; error: any };
}

type EventCallback<T> = (data: T) => void;

class EventBus {
  private listeners: Map<keyof EventTypes, EventCallback<any>[]> = new Map();
  private debug = false;

  constructor() {
    // Enable debug mode in development
    this.debug = import.meta.env.DEV;
  }

  // Subscribe to an event
  on<K extends keyof EventTypes>(
    eventType: K,
    callback: EventCallback<EventTypes[K]>
  ): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    
    this.listeners.get(eventType)?.push(callback);
    
    if (this.debug) {
      console.log(`[EventBus] Subscribed to ${eventType}`);
    }
    
    // Return unsubscribe function
    return () => this.off(eventType, callback);
  }

  // Unsubscribe from an event
  off<K extends keyof EventTypes>(
    eventType: K,
    callback: EventCallback<EventTypes[K]>
  ): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
        if (this.debug) {
          console.log(`[EventBus] Unsubscribed from ${eventType}`);
        }
      }
    }
  }

  // Emit an event
  emit<K extends keyof EventTypes>(
    eventType: K,
    data: EventTypes[K]
  ): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[EventBus] Error in ${eventType} callback:`, error);
        }
      });
      
      if (this.debug) {
        console.log(`[EventBus] Emitted ${eventType}`, data);
      }
    }
  }

  // Subscribe to an event only once
  once<K extends keyof EventTypes>(
    eventType: K,
    callback: EventCallback<EventTypes[K]>
  ): () => void {
    const unsubscribe = this.on(eventType, (data) => {
      callback(data);
      unsubscribe();
    });
    
    return unsubscribe;
  }

  // Clear all listeners for an event type
  clear(eventType?: keyof EventTypes): void {
    if (eventType) {
      this.listeners.delete(eventType);
      if (this.debug) {
        console.log(`[EventBus] Cleared listeners for ${eventType}`);
      }
    } else {
      this.listeners.clear();
      if (this.debug) {
        console.log('[EventBus] Cleared all listeners');
      }
    }
  }

  // Get all active listeners (for debugging)
  getListeners(): Map<keyof EventTypes, number> {
    const result = new Map<keyof EventTypes, number>();
    this.listeners.forEach((callbacks, eventType) => {
      result.set(eventType, callbacks.length);
    });
    return result;
  }

  // Enable/disable debug mode
  setDebug(enabled: boolean): void {
    this.debug = enabled;
  }
}

// Create and export a singleton instance
export const eventBus = new EventBus();

// Make it available globally for micro-frontends
declare global {
  interface Window {
    eventBus: typeof eventBus;
  }
}

if (typeof window !== 'undefined') {
  window.eventBus = eventBus;
}

// React hooks for easier usage
import { useEffect, useRef } from 'react';

export function useEventBus<K extends keyof EventTypes>(
  eventType: K,
  callback: EventCallback<EventTypes[K]>,
  deps: React.DependencyList = []
): void {
  const callbackRef = useRef(callback);
  
  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  useEffect(() => {
    const handler = (data: EventTypes[K]) => {
      callbackRef.current(data);
    };
    
    const unsubscribe = eventBus.on(eventType, handler);
    
    return unsubscribe;
  }, [eventType]);
}

export function useEventEmitter() {
  return {
    emit: eventBus.emit.bind(eventBus),
    emitCartAdd: (item: any) => eventBus.emit('cart:add', { item }),
    emitCartRemove: (itemId: string) => eventBus.emit('cart:remove', { itemId }),
    emitCartUpdate: (itemId: string, quantity: number) => eventBus.emit('cart:update', { itemId, quantity }),
    emitCartClear: () => eventBus.emit('cart:clear', undefined),
    emitUserLogin: (user: any) => eventBus.emit('user:login', { user }),
    emitUserLogout: () => eventBus.emit('user:logout', undefined),
    emitNavigationChange: (path: string, module: string) => eventBus.emit('navigation:change', { path, module }),
    emitOrderAdd: (order: any) => eventBus.emit('orders:add', { order }),
    emitMfeReady: (mfeName: string) => eventBus.emit('mfe:ready', { mfeName }),
    emitMfeError: (mfeName: string, error: any) => eventBus.emit('mfe:error', { mfeName, error })
  };
}

// Utility function to sync state across MFEs
export function syncStateAcrossMFEs(stateType: string, payload: any): void {
  eventBus.emit('state:sync', { type: stateType, payload });
}

export default eventBus;