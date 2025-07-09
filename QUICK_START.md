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

#### Option 1: One-Command Start (Recommended)
```bash
# This will kill any occupied ports and start all apps
pnpm run dev:clean
```

#### Option 2: Manual Start
```bash
# Kill any processes on required ports
pnpm run kill-ports

# Start all applications
pnpm run dev
```

### Access URLs
- **Main Application**: http://localhost:3000
- **Individual MFEs**:
  - Header: http://localhost:3001/header-mfe/
  - Left Nav: http://localhost:3002/left-nav-mfe/
  - Cart: http://localhost:3003/cart-mfe/
  - Orders: http://localhost:3004/orders-mfe/
  - Profile: http://localhost:3005/profile-mfe/

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start all applications concurrently |
| `pnpm run dev:clean` | Kill ports and start fresh |
| `pnpm run kill-ports` | Kill processes on required ports |
| `pnpm run build` | Build all applications |
| `pnpm run build:mfes` | Build only micro-frontends |

### Navigation
- Click on navigation items in the left sidebar to switch between:
  - Dashboard (Home)
  - Profile
  - Cart
  - Orders

### Troubleshooting
- **Port conflicts**: Run `pnpm run kill-ports`
- **Module Federation issues**: Check all apps are running
- **Build errors**: Run `pnpm run build:mfes`

See [PORT_CONFIGURATION.md](./PORT_CONFIGURATION.md) for detailed port management.