#!/bin/bash

# Setup Production Environment Script
# This script creates the .env.production file with Vercel URLs

set -e

echo "🚀 Setting up production environment for Shell App..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check if we're in the correct directory
if [ ! -f "pnpm-workspace.yaml" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Create .env.production file
print_status "Creating .env.production file with Vercel URLs..."

cat > apps/shell-app/.env.production << 'EOF'
# Production Environment Variables for Shell App
# Vercel Deployment URLs

# MFE Service URLs - Vercel Deployment
HEADER_MFE_URL=https://whatfix-assignment-header-mfe.vercel.app
LEFT_NAV_MFE_URL=https://whatfix-assignment-left-nav-mfe.vercel.app
CART_MFE_URL=https://whatfix-assignment-cart-mfe.vercel.app
ORDERS_MFE_URL=https://whatfix-assignment-orders-mfe.vercel.app
PROFILE_MFE_URL=https://whatfix-assignment-profile-mfe.vercel.app
CHECKOUT_MFE_URL=https://whatfix-assignment-checkout-mfe.vercel.app
PAYMENT_MFE_URL=https://whatfix-assignment-payment-mfe.vercel.app

# Shell App Configuration
VITE_APP_TITLE=Whatfix E-commerce
VITE_API_BASE_URL=https://api.yourdomain.com
EOF

print_success "Production environment file created: apps/shell-app/.env.production"

# Display the created file
print_status "Environment file contents:"
echo "----------------------------------------"
cat apps/shell-app/.env.production
echo "----------------------------------------"

print_success "Production environment setup completed! 🎉"
print_status "You can now run: pnpm run build:production" 