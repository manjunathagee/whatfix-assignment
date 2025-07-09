# E-Commerce Micro-Frontend Application

## Assignment Overview

This is a comprehensive e-commerce application built using **Module Federation** architecture, demonstrating modern micro-frontend patterns with shared state management across independent applications.

## 🌐 Live Demo

**Main Application**: https://whatfix-ecommerce-mfe.netlify.app/

### Individual Micro-Frontend Deployments:
- **Header MFE**: https://whatfix-assignment-header-mfe.netlify.app
- **Left Nav MFE**: https://whatfix-assignment-left-nav-mfe.netlify.app
- **Cart MFE**: https://whatfix-assignment-cart-mfe.netlify.app
- **Orders MFE**: https://whatfix-assignment-orders-mfe.netlify.app
- **Profile MFE**: https://whatfix-assignment-profile-mfe.netlify.app
- **Checkout MFE**: https://whatfix-assignment-checkout-mfe.netlify.app
- **Payment MFE**: https://whatfix-assignment-payment-mfe.netlify.app

> **Note**: Each micro-frontend is deployed independently on Netlify, demonstrating true micro-frontend architecture where each service can be updated and deployed separately.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/manjunathagee/whatfix-assignment.git
cd whatfix-assignment

# Install dependencies
pnpm install

# Run the application locally
pnpm dev:preview
```

The application will be available at:

- **Shell App**: http://localhost:3000
- **Header MFE**: http://localhost:3001/header-mfe/
- **Left Nav MFE**: http://localhost:3002/left-nav-mfe/
- **Cart MFE**: http://localhost:3003/cart-mfe/
- **Orders MFE**: http://localhost:3004/orders-mfe/
- **Checkout MFE**: http://localhost:3006/checkout-mfe/
- **Payment MFE**: http://localhost:3007/payment-mfe/

## 🏗️ Architecture Overview

### Module Federation Implementation

This application uses **Webpack Module Federation** to create a micro-frontend architecture where each business domain is an independent, deployable application.

#### Federation Configuration

**Shell App (Host)**

```javascript
// apps/shell-app/vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shell-app",
      remotes: {
        "header-mfe": "http://localhost:3001/assets/remoteEntry.js",
        "left-nav-mfe": "http://localhost:3002/assets/remoteEntry.js",
        "cart-mfe": "http://localhost:3003/assets/remoteEntry.js",
        "orders-mfe": "http://localhost:3004/assets/remoteEntry.js",
        "checkout-mfe": "http://localhost:3006/assets/remoteEntry.js",
        "payment-mfe": "http://localhost:3007/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
```

**Micro-Frontend (Remote)**

```javascript
// apps/cart-mfe/vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart-mfe",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/components/Cart.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
```

#### Dynamic Module Loading

```typescript
// apps/shell-app/src/components/MicroFrontendLoader.tsx
const MicroFrontendLoader: React.FC<MicroFrontendLoaderProps> = ({
  name,
  componentName,
  fallback = <div>Loading...</div>,
  errorBoundary = true,
}) => {
  const Component = useMemo(() => {
    return React.lazy(async () => {
      try {
        const module = await import(/* @vite-ignore */ name);
        return { default: module[componentName] };
      } catch (error) {
        console.error(`Failed to load ${name}:`, error);
        throw error;
      }
    });
  }, [name, componentName]);

  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};
```

## 🔄 State Management & Communication

### Event Bus Architecture

State is shared across micro-frontends using a custom **Event Bus** system that enables decoupled communication.

#### Event Bus Implementation

```typescript
// apps/shell-app/src/services/eventBus.ts
class EventBus {
  private events: Map<string, Set<EventHandler>> = new Map();
  private debug = false;

  on(event: string, handler: EventHandler): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(handler);

    return () => {
      this.events.get(event)?.delete(handler);
    };
  }

  emit(event: string, data?: any): void {
    if (this.debug) {
      console.log(`[EventBus] Emitting: ${event}`, data);
    }

    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }
}
```

#### Global State Store

```typescript
// apps/shell-app/src/stores/globalStore.ts
export const useGlobalStore = create<GlobalStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        cart: [],
        cartCount: 0,
        cartTotal: 0,
        orders: [],

        addToCart: (item: CartItem) => {
          const currentCart = get().cart;
          const existingItem = currentCart.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            set((state) => ({
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            }));
          } else {
            set((state) => ({ cart: [...state.cart, item] }));
          }

          const newCart = get().cart;
          set({
            cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
            cartTotal: newCart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          });
        },

        addOrder: (order: Order) => {
          set((state) => ({ orders: [...state.orders, order] }));
        },
      }),
      { name: "global-store" }
    )
  )
);
```

#### State Synchronization Service

```typescript
// apps/shell-app/src/services/stateSyncService.ts
class StateSyncService {
  private setupEventListeners(): void {
    // Cart synchronization
    eventBus.on("cart:add", ({ item }) => {
      useGlobalStore.getState().addToCart(item);
    });

    eventBus.on("cart:clear", () => {
      useGlobalStore.getState().clearCart();
    });

    // Orders synchronization
    eventBus.on("orders:add", ({ order }) => {
      useGlobalStore.getState().addOrder(order);
    });
  }

  private setupStoreSubscriptions(): void {
    // Broadcast cart changes to all MFEs
    useGlobalStore.subscribe(
      (state) => state.cart,
      (cart) => {
        eventBus.emit("cart:sync", { cart });
      }
    );

    // Broadcast order changes to all MFEs
    useGlobalStore.subscribe(
      (state) => state.orders,
      (orders) => {
        eventBus.emit("orders:sync", { orders });
      }
    );
  }
}
```

### MFE State Hooks

Each micro-frontend has its own hook to interact with global state:

```typescript
// apps/cart-mfe/src/hooks/useGlobalState.ts
export function useGlobalActions() {
  const emitEvent = (eventType: string, data: any) => {
    const eventBus = (window as any).eventBus;
    if (eventBus) {
      eventBus.emit(eventType, data);
    }
  };

  return {
    addToCart: (item: CartItem) => {
      emitEvent("cart:add", { item });
    },

    createOrder: (order: any) => {
      emitEvent("orders:add", { order });
    },

    navigateTo: (path: string, module: string) => {
      emitEvent("navigation:change", { path, module });
    },
  };
}
```

### Cart to Orders Flow

```typescript
// apps/cart-mfe/src/components/Cart.tsx
const handleCheckout = () => {
  const now = new Date();
  const order = {
    id: `order-${now.getTime()}`,
    orderNumber: `ORD-${now.getTime()}`,
    date: now.toISOString(),
    userId: "current-user",
    items: cartItems,
    total: cartTotal * 1.08, // Including tax
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  createOrder(order);
  clearCart();
  alert("Order created successfully! You will be redirected to orders page.");
  navigateTo("/orders", "orders");
};
```

## 🗂️ Project Structure

```
whatfix-assignment/
├── apps/
│   ├── shell-app/              # Main host application
│   │   ├── src/
│   │   │   ├── components/     # Shell components
│   │   │   ├── services/       # Event bus & state sync
│   │   │   ├── stores/         # Global Zustand store
│   │   │   └── App.tsx
│   │   └── vite.config.ts
│   │
│   ├── header-mfe/             # Header micro-frontend
│   ├── left-nav-mfe/           # Navigation micro-frontend
│   ├── cart-mfe/               # Shopping cart micro-frontend
│   ├── orders-mfe/             # Orders history micro-frontend
│   ├── checkout-mfe/           # Checkout process micro-frontend
│   └── payment-mfe/            # Payment processing micro-frontend
│
├── packages/
│   └── shared-ui/              # Shared UI components
│
├── package.json                # Root package.json with pnpm workspaces
└── pnpm-workspace.yaml        # pnpm workspace configuration
```

## 🛠️ Technology Stack

### Core Technologies

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Module Federation** - Micro-frontend architecture

### State Management

- **Zustand** - Global state management
- **Custom Event Bus** - Inter-MFE communication
- **localStorage persistence** - State persistence

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library

### Package Management

- **pnpm** - Fast, disk space efficient package manager
- **pnpm workspaces** - Monorepo management

## 🔧 Development Scripts

```bash
# Install all dependencies
pnpm install

# Start all micro-frontends in development mode
pnpm dev

# Start all micro-frontends in preview mode (production build)
pnpm dev:preview

# Build all applications
pnpm build

# Build specific micro-frontend
pnpm --filter shell-app build

# Run tests
pnpm test

# Lint all code
pnpm lint

# Type check all applications
pnpm type-check
```

### Current Technical Debt

- **Hardcoded User ID**: Currently using "current-user" placeholder
- **Mock Data**: No real backend integration yet
- **Limited Error Handling**: Basic error boundaries need enhancement
- **No Loading States**: Missing loading indicators for async operations
- **Styling Inconsistencies**: Need design system standardization

## 🚀 Production Deployment

This application is **currently deployed** on Netlify with each micro-frontend as an independent deployment:

### Deployment Architecture
1. **Built independently**: Each MFE has its own build pipeline
2. **Deployed to separate Netlify sites**: Independent deployments for each MFE
3. **Environment-based remotes**: Production URLs configured via environment variables
4. **Independent scaling**: Each MFE can be updated without affecting others

### Actual Production Configuration

```javascript
// Production remotes configuration (from environment variables)
remotes: {
  'header-mfe': 'https://whatfix-assignment-header-mfe.netlify.app/assets/remoteEntry.js',
  'left-nav-mfe': 'https://whatfix-assignment-left-nav-mfe.netlify.app/assets/remoteEntry.js',
  'cart-mfe': 'https://whatfix-assignment-cart-mfe.netlify.app/assets/remoteEntry.js',
  'orders-mfe': 'https://whatfix-assignment-orders-mfe.netlify.app/assets/remoteEntry.js',
  'profile-mfe': 'https://whatfix-assignment-profile-mfe.netlify.app/assets/remoteEntry.js',
  'checkout-mfe': 'https://whatfix-assignment-checkout-mfe.netlify.app/assets/remoteEntry.js',
  'payment-mfe': 'https://whatfix-assignment-payment-mfe.netlify.app/assets/remoteEntry.js',
}
```

### Environment Variables Used
```bash
HEADER_MFE_URL=https://whatfix-assignment-header-mfe.netlify.app
LEFT_NAV_MFE_URL=https://whatfix-assignment-left-nav-mfe.netlify.app
CART_MFE_URL=https://whatfix-assignment-cart-mfe.netlify.app
ORDERS_MFE_URL=https://whatfix-assignment-orders-mfe.netlify.app
PROFILE_MFE_URL=https://whatfix-assignment-profile-mfe.netlify.app
CHECKOUT_MFE_URL=https://whatfix-assignment-checkout-mfe.netlify.app
PAYMENT_MFE_URL=https://whatfix-assignment-payment-mfe.netlify.app
```

### Deployment Benefits Achieved
✅ **Independent deployments**: Each team can deploy their MFE independently  
✅ **Zero downtime updates**: Update individual MFEs without affecting the whole app  
✅ **Fault isolation**: If one MFE fails, others continue working  
✅ **Scalable architecture**: Each MFE can be scaled based on individual traffic patterns  
✅ **Technology flexibility**: Each MFE can use different build tools or frameworks
