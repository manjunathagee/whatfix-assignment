#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Micro-Frontend Dashboard Development Environment${NC}"
echo -e "${BLUE}=======================================================${NC}"

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo -e "${YELLOW}📁 Project root: $PROJECT_ROOT${NC}"

# Step 1: Kill any processes on required ports
echo -e "\n${YELLOW}🔄 Step 1: Cleaning up ports...${NC}"
$SCRIPT_DIR/kill-ports.sh

# Step 2: Start all applications
echo -e "\n${YELLOW}🔄 Step 2: Starting all applications...${NC}"
cd "$PROJECT_ROOT"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm is not installed. Please install pnpm first.${NC}"
    echo -e "${YELLOW}   npm install -g pnpm${NC}"
    exit 1
fi

# Start all applications
echo -e "${GREEN}🎯 Starting all micro-frontend applications...${NC}"
pnpm run dev

echo -e "\n${GREEN}🎉 All applications should be running!${NC}"
echo -e "${BLUE}Access URLs:${NC}"
echo -e "  • Shell App:     ${GREEN}http://localhost:3000${NC}"
echo -e "  • Header MFE:    ${GREEN}http://localhost:3001${NC}"
echo -e "  • Left Nav MFE:  ${GREEN}http://localhost:3002${NC}"
echo -e "  • Cart MFE:      ${GREEN}http://localhost:3003${NC}"
echo -e "  • Orders MFE:    ${GREEN}http://localhost:3004${NC}"
echo -e "  • Profile MFE:   ${GREEN}http://localhost:3005${NC}"
echo -e "  • Checkout MFE:  ${GREEN}http://localhost:3006${NC}"
echo -e "  • Payment MFE:   ${GREEN}http://localhost:3007${NC}"