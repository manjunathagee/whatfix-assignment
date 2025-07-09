# Quick Start Guide

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

#### Option 1: Static Assets Development (Recommended)

```bash
# This will kill occupied ports, build all MFE apps, and serve static assets
pnpm run dev:preview
```

#### Option 2: Live Development (Hot Reload)

```bash
# Start all applications with live development servers
pnpm run dev
```

#### Option 3: Static Assets with Copy (Legacy)

```bash
# Build MFE apps, copy assets to shell-app, and start shell-app
pnpm run dev:static
```

### Access URLs

- **Main Application**: http://localhost:3000
- **Individual MFEs** (when using dev:preview):
  - Header: http://localhost:3001/header-mfe/
  - Left Nav: http://localhost:3002/left-nav-mfe/
  - Cart: http://localhost:3003/cart-mfe/
  - Orders: http://localhost:3004/orders-mfe/
  - Profile: http://localhost:3005/profile-mfe/

### Available Scripts

| Script                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `pnpm run dev`         | Start all applications with live development servers |
| `pnpm run dev:preview` | Kill ports, build MFE apps, and serve static assets  |
| `pnpm run dev:static`  | Build MFE apps, copy assets, and start shell-app     |
| `pnpm run build`       | Build all applications                               |
| `pnpm run build:mfes`  | Build only micro-frontends                           |
| `pnpm run serve:mfes`  | Serve built MFE apps with preview servers            |

### Development Modes

#### Static Assets Development (`dev:preview`)

- **Pros**: Faster startup, no hot reload overhead, production-like behavior
- **Cons**: Requires rebuild for MFE changes
- **Best for**: Testing production builds, performance testing, demo purposes

#### Live Development (`dev`)

- **Pros**: Hot reload for all apps, instant feedback
- **Cons**: Slower startup, more resource usage
- **Best for**: Active development, debugging

### Navigation

- Click on navigation items in the left sidebar to switch between:
  - Dashboard (Home)
  - Profile
  - Cart
  - Orders

### Troubleshooting

- **Port conflicts**: The `dev:preview` script automatically kills occupied ports
- **Module Federation issues**: Ensure all MFE preview servers are running
- **Build errors**: Run `pnpm run build:mfes` to check individual builds
- **Remote entry not found**: Verify MFE apps are built and preview servers are running

See [PORT_CONFIGURATION.md](./PORT_CONFIGURATION.md) for detailed port management.
