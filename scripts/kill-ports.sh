#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Checking and killing processes on required ports...${NC}"

# Define the ports used by our micro-frontend applications
PORTS=(3000 3001 3002 3003 3004 3005 3006 3007)

# Function to get app name by port
get_app_name() {
    case $1 in
        3000) echo "Shell App" ;;
        3001) echo "Header MFE" ;;
        3002) echo "Left Nav MFE" ;;
        3003) echo "Cart MFE" ;;
        3004) echo "Orders MFE" ;;
        3005) echo "Profile MFE" ;;
        3006) echo "Checkout MFE (Future)" ;;
        3007) echo "Payment MFE (Future)" ;;
        *) echo "Unknown App" ;;
    esac
}

kill_port() {
    local port=$1
    local app_name=$(get_app_name $port)
    
    # Find process using the port
    local pid=$(lsof -ti:$port)
    
    if [ ! -z "$pid" ]; then
        echo -e "${RED}⚠️  Port $port ($app_name) is occupied by process $pid${NC}"
        
        # Get process details
        local process_info=$(ps -p $pid -o comm= 2>/dev/null)
        echo -e "${YELLOW}   Process: $process_info${NC}"
        
        # Kill the process
        kill -9 $pid 2>/dev/null
        
        # Verify the process is killed
        if ! kill -0 $pid 2>/dev/null; then
            echo -e "${GREEN}✅ Successfully killed process on port $port${NC}"
        else
            echo -e "${RED}❌ Failed to kill process on port $port${NC}"
        fi
    else
        echo -e "${GREEN}✅ Port $port ($app_name) is available${NC}"
    fi
}

# Kill processes on all required ports
for port in "${PORTS[@]}"; do
    kill_port $port
done

echo -e "${GREEN}🎉 Port cleanup completed!${NC}"
echo -e "${YELLOW}💡 You can now run 'pnpm run dev' to start all applications${NC}"