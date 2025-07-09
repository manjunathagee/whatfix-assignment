# Production Deployment Guide

## Overview

This guide explains how to deploy the Whatfix MFE (Micro Frontend) application to production. The application consists of multiple independent micro-frontends and a shell application that orchestrates them.

## Architecture

- **Shell App**: Main orchestrator application (Port 3000)
- **Header MFE**: Header component (Port 3001)
- **Left Nav MFE**: Navigation component (Port 3002)
- **Cart MFE**: Shopping cart (Port 3003)
- **Orders MFE**: Order management (Port 3004)
- **Profile MFE**: User profile (Port 3005)
- **Checkout MFE**: Checkout process (Port 3006)
- **Payment MFE**: Payment management (Port 3007)

## Prerequisites

### 1. Infrastructure Requirements

- **Domain/Subdomain**: Each MFE needs its own subdomain or path
- **SSL Certificates**: HTTPS is required for production
- **CDN**: Recommended for static assets
- **Load Balancer**: For high availability (optional)

### 2. Production URLs Structure

```
https://shell.yourdomain.com          # Shell App
https://header-mfe.yourdomain.com     # Header MFE
https://left-nav-mfe.yourdomain.com   # Left Nav MFE
https://cart-mfe.yourdomain.com       # Cart MFE
https://orders-mfe.yourdomain.com     # Orders MFE
https://profile-mfe.yourdomain.com    # Profile MFE
https://checkout-mfe.yourdomain.com   # Checkout MFE
https://payment-mfe.yourdomain.com    # Payment MFE
```

## Step 1: Build for Production

### Option A: Using the Build Script (Recommended)

```bash
# Run the production build script
./scripts/build-production.sh
```

### Option B: Manual Build

```bash
# Set production environment
export NODE_ENV=production

# Build all applications
pnpm --filter header-mfe build
pnpm --filter left-nav-mfe build
pnpm --filter cart-mfe build
pnpm --filter orders-mfe build
pnpm --filter profile-mfe build
pnpm --filter checkout-mfe build
pnpm --filter payment-mfe build
pnpm --filter shell-app build
```

## Step 2: Configure Environment Variables

### Create Production Environment File

Copy the example file and update with your production URLs:

```bash
cp apps/shell-app/env.production.example apps/shell-app/.env.production
```

### Update Production URLs

Edit `apps/shell-app/.env.production`:

```env
# Replace with your actual production domain URLs
HEADER_MFE_URL=https://header-mfe.yourdomain.com
LEFT_NAV_MFE_URL=https://left-nav-mfe.yourdomain.com
CART_MFE_URL=https://cart-mfe.yourdomain.com
ORDERS_MFE_URL=https://orders-mfe.yourdomain.com
PROFILE_MFE_URL=https://profile-mfe.yourdomain.com
CHECKOUT_MFE_URL=https://checkout-mfe.yourdomain.com
PAYMENT_MFE_URL=https://payment-mfe.yourdomain.com

# Shell App Configuration
VITE_APP_TITLE=Whatfix E-commerce
VITE_API_BASE_URL=https://api.yourdomain.com
```

## Step 3: Deploy Individual MFEs

### Deploy Each MFE to Its Domain

For each MFE, deploy the `dist` folder to its respective production domain:

#### Example: Deploying Cart MFE

```bash
# Build the MFE
cd apps/cart-mfe
pnpm build

# Deploy dist/ folder to https://cart-mfe.yourdomain.com
# The dist/ folder should be served at the root of the domain
```

#### Required Server Configuration for Each MFE

Each MFE server must:

1. **Serve static files** from the `dist/` directory
2. **Enable CORS** for cross-origin requests
3. **Serve `remoteEntry.js`** at `/assets/remoteEntry.js`
4. **Handle routing** (SPA fallback)

#### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name cart-mfe.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name cart-mfe.yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # CORS headers
    add_header Access-Control-Allow-Origin "*";
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";

    # Serve static files
    root /var/www/cart-mfe/dist;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Ensure remoteEntry.js is accessible
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Step 4: Deploy Shell App

### Deploy Shell App to Main Domain

```bash
# Build shell app with production environment
cd apps/shell-app
NODE_ENV=production pnpm build

# Deploy dist/ folder to https://shell.yourdomain.com
```

### Shell App Server Configuration

The shell app needs similar configuration but serves as the main application:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Serve static files
    root /var/www/shell-app/dist;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Step 5: Verify Deployment

### 1. Check Individual MFE Accessibility

```bash
# Test each MFE's remoteEntry.js
curl -I https://header-mfe.yourdomain.com/assets/remoteEntry.js
curl -I https://cart-mfe.yourdomain.com/assets/remoteEntry.js
# ... repeat for all MFEs
```

### 2. Test Shell App Loading

- Visit the main domain
- Check browser console for any loading errors
- Verify all MFEs load correctly

### 3. Test Module Federation

- Open browser developer tools
- Check Network tab for remoteEntry.js requests
- Verify no CORS errors

## Step 6: Monitoring and Maintenance

### Health Checks

Set up health check endpoints for each MFE:

```javascript
// Add to each MFE's server
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});
```

### Error Monitoring

- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor Module Federation loading failures
- Track performance metrics

### CORS Configuration

Ensure proper CORS configuration for production:

```javascript
// Example CORS configuration for Express
app.use(
  cors({
    origin: ["https://yourdomain.com", "https://shell.yourdomain.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

## Troubleshooting

### Common Issues

#### 1. Module Federation Loading Failures

**Symptoms**: Console errors about failed remote loading
**Solutions**:

- Verify all MFE URLs are correct
- Check CORS configuration
- Ensure `remoteEntry.js` is accessible
- Verify SSL certificates

#### 2. CORS Errors

**Symptoms**: Browser console CORS errors
**Solutions**:

- Configure proper CORS headers on all MFE servers
- Ensure all domains are HTTPS
- Check preflight requests

#### 3. Routing Issues

**Symptoms**: 404 errors on page refresh
**Solutions**:

- Configure SPA fallback on all servers
- Ensure proper `try_files` configuration in Nginx

#### 4. Performance Issues

**Symptoms**: Slow loading times
**Solutions**:

- Enable CDN for static assets
- Configure proper caching headers
- Optimize bundle sizes
- Use HTTP/2

### Debug Commands

```bash
# Check if remoteEntry.js is accessible
curl -v https://cart-mfe.yourdomain.com/assets/remoteEntry.js

# Test CORS preflight
curl -H "Origin: https://yourdomain.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://cart-mfe.yourdomain.com/assets/remoteEntry.js

# Check SSL certificate
openssl s_client -connect cart-mfe.yourdomain.com:443 -servername cart-mfe.yourdomain.com
```

## Security Considerations

### 1. Content Security Policy (CSP)

Add CSP headers to prevent XSS attacks:

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.yourdomain.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.yourdomain.com;";
```

### 2. Subresource Integrity (SRI)

Consider implementing SRI for additional security:

```html
<script
  src="https://cart-mfe.yourdomain.com/assets/remoteEntry.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

### 3. Environment Variables

- Never commit production URLs to version control
- Use environment-specific configuration files
- Rotate secrets regularly

## Performance Optimization

### 1. CDN Configuration

- Serve static assets through CDN
- Configure proper cache headers
- Use edge locations for global performance

### 2. Bundle Optimization

- Enable code splitting
- Implement lazy loading
- Use tree shaking
- Optimize images and assets

### 3. Caching Strategy

```nginx
# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Cache remoteEntry.js with shorter TTL
location /assets/remoteEntry.js {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

## Rollback Strategy

### 1. Version Tagging

Tag each deployment with a version:

```bash
git tag -a v1.0.0 -m "Production deployment v1.0.0"
git push origin v1.0.0
```

### 2. Blue-Green Deployment

Consider implementing blue-green deployment for zero-downtime updates.

### 3. Rollback Process

1. Identify the previous working version
2. Revert to previous deployment
3. Update DNS/load balancer configuration
4. Verify functionality

## Support and Maintenance

### Regular Tasks

- Monitor application performance
- Update dependencies regularly
- Review and rotate SSL certificates
- Backup configuration files
- Monitor error rates and user experience

### Emergency Contacts

- DevOps team: [contact info]
- Development team: [contact info]
- Infrastructure team: [contact info]

---

**Note**: This guide assumes a standard web server deployment. For containerized deployments (Docker, Kubernetes), additional configuration may be required.
