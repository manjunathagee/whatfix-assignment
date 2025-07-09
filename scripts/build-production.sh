#!/bin/bash

# Production Build Script for Whatfix MFE Application
# This script builds all micro-frontends and the shell app for production deployment

set -e  # Exit on any error

echo "🚀 Starting production build for Whatfix MFE Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    print_error "pnpm is not installed. Please install pnpm first."
    exit 1
fi

# Check if we're in the correct directory
if [ ! -f "pnpm-workspace.yaml" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf apps/*/dist
rm -rf apps/*/build

# Install dependencies
print_status "Installing dependencies..."
pnpm install

# Set production environment
export NODE_ENV=production

# Build all MFEs
print_status "Building micro-frontends..."

# Build Header MFE
print_status "Building Header MFE..."
cd apps/header-mfe
pnpm build
cd ../..

# Build Left Nav MFE
print_status "Building Left Nav MFE..."
cd apps/left-nav-mfe
pnpm build
cd ../..

# Build Cart MFE
print_status "Building Cart MFE..."
cd apps/cart-mfe
pnpm build
cd ../..

# Build Orders MFE
print_status "Building Orders MFE..."
cd apps/orders-mfe
pnpm build
cd ../..

# Build Profile MFE
print_status "Building Profile MFE..."
cd apps/profile-mfe
pnpm build
cd ../..

# Build Checkout MFE
print_status "Building Checkout MFE..."
cd apps/checkout-mfe
pnpm build
cd ../..

# Build Payment MFE
print_status "Building Payment MFE..."
cd apps/payment-mfe
pnpm build
cd ../..

# Build Shell App
print_status "Building Shell App..."
cd apps/shell-app
pnpm build
cd ../..

print_success "All applications built successfully!"

# Create deployment summary
print_status "Creating deployment summary..."
cat > deployment-summary.md << EOF
# Production Build Summary

## Build Date
$(date)

## Built Applications
- ✅ Header MFE (apps/header-mfe/dist)
- ✅ Left Nav MFE (apps/left-nav-mfe/dist)
- ✅ Cart MFE (apps/cart-mfe/dist)
- ✅ Orders MFE (apps/orders-mfe/dist)
- ✅ Profile MFE (apps/profile-mfe/dist)
- ✅ Checkout MFE (apps/checkout-mfe/dist)
- ✅ Payment MFE (apps/payment-mfe/dist)
- ✅ Shell App (apps/shell-app/dist)

## Next Steps
1. Deploy each MFE to its respective production domain
2. Update the shell app's environment variables with production URLs
3. Deploy the shell app
4. Test the complete application

## Important Notes
- Ensure all production domains are accessible
- Configure CORS properly on all MFE servers
- Set up proper SSL certificates
- Configure CDN for static assets if needed
EOF

print_success "Deployment summary created: deployment-summary.md"

# Display build sizes
print_status "Build sizes:"
for app in apps/*/dist; do
    if [ -d "$app" ]; then
        size=$(du -sh "$app" | cut -f1)
        app_name=$(basename $(dirname "$app"))
        echo "  $app_name: $size"
    fi
done

print_success "Production build completed successfully! 🎉"
print_warning "Remember to update environment variables with your production URLs before deployment." 