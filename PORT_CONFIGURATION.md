# Port Configuration Guide

## Overview
This document outlines the port configuration for all micro-frontend applications in the project.

## Port Assignments

| Port | Application | URL | Status |
|------|-------------|-----|--------|
| 3000 | Shell App | http://localhost:3000/ | ✅ Active |
| 3001 | Header MFE | http://localhost:3001/header-mfe/ | ✅ Active |
| 3002 | Left Nav MFE | http://localhost:3002/left-nav-mfe/ | ✅ Active |
| 3003 | Cart MFE | http://localhost:3003/cart-mfe/ | ✅ Active |
| 3004 | Orders MFE | http://localhost:3004/orders-mfe/ | ✅ Active |
| 3005 | Profile MFE | http://localhost:3005/profile-mfe/ | ✅ Active |
| 3006 | Checkout MFE | http://localhost:3006/checkout-mfe/ | 🚧 Future |
| 3007 | Payment MFE | http://localhost:3007/payment-mfe/ | 🚧 Future |

## Module Federation Remote URLs

The shell application (`shell-app`) consumes the following remote modules:

```javascript
remotes: {
  headerMfe: 'http://localhost:3001/assets/remoteEntry.js',
  leftNavMfe: 'http://localhost:3002/assets/remoteEntry.js',
  cartMfe: 'http://localhost:3003/assets/remoteEntry.js',
  ordersMfe: 'http://localhost:3004/assets/remoteEntry.js',
  profileMfe: 'http://localhost:3005/assets/remoteEntry.js',
  checkoutMfe: 'http://localhost:3006/assets/remoteEntry.js',
  paymentMfe: 'http://localhost:3007/assets/remoteEntry.js',
}
```

## Starting Applications

### Option 1: Quick Start (Recommended)
```bash
# Kill any processes on required ports and start all apps
pnpm run dev:clean
```

### Option 2: Manual Port Management
```bash
# Kill processes on required ports
pnpm run kill-ports

# Start all applications
pnpm run dev
```

### Option 3: Individual Applications
```bash
# Start each application individually
pnpm --filter shell-app dev     # Port 3000
pnpm --filter header-mfe dev    # Port 3001
pnpm --filter left-nav-mfe dev  # Port 3002
pnpm --filter cart-mfe dev      # Port 3003
pnpm --filter orders-mfe dev    # Port 3004
pnpm --filter profile-mfe dev   # Port 3005
```

## Port Management Scripts

### Kill Ports Script
Location: `./scripts/kill-ports.sh`

Features:
- Checks all required ports (3000-3007)
- Identifies processes using each port
- Safely terminates processes
- Provides colored output for better visibility

### Start Development Script
Location: `./scripts/start-dev.sh`

Features:
- Runs port cleanup automatically
- Starts all applications concurrently
- Provides comprehensive URL listing
- Includes error handling

## Troubleshooting

### Port Already in Use
If you encounter "Port already in use" errors:

1. **Use the kill-ports script:**
   ```bash
   ./scripts/kill-ports.sh
   ```

2. **Check manually:**
   ```bash
   lsof -ti:3000  # Check specific port
   kill -9 <PID>  # Kill specific process
   ```

3. **Find all Node processes:**
   ```bash
   ps aux | grep node
   pkill -f "node"  # Kill all Node processes (use with caution)
   ```

### Configuration Issues
If Module Federation fails to load remotes:

1. **Verify all MFEs are running:**
   - Check each URL individually
   - Ensure all ports are accessible

2. **Check remote URLs in shell-app:**
   - File: `apps/shell-app/vite.config.ts`
   - Ensure URLs match actual running ports

3. **Verify network access:**
   ```bash
   curl http://localhost:3001/assets/remoteEntry.js
   ```

## Configuration Files

### Shell App Configuration
File: `apps/shell-app/vite.config.ts`
- Port: 3000
- Consumes remote modules from other MFEs

### MFE Configuration Template
Each MFE has similar configuration:
```javascript
server: {
  port: 30XX,  // Unique port for each MFE
},
federation: {
  name: 'mfeName',
  filename: 'remoteEntry.js',
  exposes: {
    './Component': './src/components/Component',
  },
  shared: ['react', 'react-dom'],
},
```

## Best Practices

1. **Always use the kill-ports script** before starting development
2. **Keep port assignments consistent** across all environments
3. **Update this documentation** when adding new MFEs
4. **Test Module Federation** after any port changes
5. **Use concurrency** for better development experience

## Future Enhancements

- [ ] Add health check endpoints for all MFEs
- [ ] Implement automatic port discovery
- [ ] Add Docker configuration with port mapping
- [ ] Create production deployment port configuration