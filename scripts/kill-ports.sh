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
        3006) echo "Checkout MFE" ;;
        3007) echo "Payment MFE" ;;
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
        
        # Try multiple kill strategies
        echo -e "${YELLOW}   Attempting to kill process...${NC}"
        
        # First try graceful kill
        kill $pid 2>/dev/null
        sleep 1
        
        # Check if still running, then force kill
        if kill -0 $pid 2>/dev/null; then
            echo -e "${YELLOW}   Process still running, forcing kill...${NC}"
            kill -9 $pid 2>/dev/null
            sleep 1
        fi
        
        # Final check
        if ! kill -0 $pid 2>/dev/null; then
            echo -e "${GREEN}✅ Successfully killed process on port $port${NC}"
        else
            echo -e "${RED}❌ Failed to kill process on port $port${NC}"
            echo -e "${YELLOW}   Trying alternative kill methods...${NC}"
            
            # Try killing by port directly
            lsof -ti:$port | xargs kill -9 2>/dev/null
            sleep 1
            
            # Final verification
            if [ -z "$(lsof -ti:$port 2>/dev/null)" ]; then
                echo -e "${GREEN}✅ Successfully killed process on port $port (alternative method)${NC}"
            else
                echo -e "${RED}❌ Still failed to kill process on port $port${NC}"
            fi
        fi
    else
        echo -e "${GREEN}✅ Port $port ($app_name) is available${NC}"
    fi
}

# Kill processes on all required ports
for port in "${PORTS[@]}"; do
    kill_port $port
done

# Additional cleanup for any remaining vite or node processes
echo -e "${YELLOW}🔍 Performing additional cleanup...${NC}"

# Kill any remaining vite processes
pkill -f "vite" 2>/dev/null && echo -e "${GREEN}✅ Killed remaining vite processes${NC}" || echo -e "${YELLOW}⚠️  No vite processes found${NC}"

# Kill any remaining pnpm dev processes
pkill -f "pnpm.*dev" 2>/dev/null && echo -e "${GREEN}✅ Killed remaining pnpm dev processes${NC}" || echo -e "${YELLOW}⚠️  No pnpm dev processes found${NC}"

# Final verification
echo -e "${YELLOW}🔍 Final port verification...${NC}"
for port in "${PORTS[@]}"; do
    if [ -z "$(lsof -ti:$port 2>/dev/null)" ]; then
        echo -e "${GREEN}✅ Port $port is free${NC}"
    else
        echo -e "${RED}❌ Port $port is still occupied${NC}"
    fi
done

echo -e "${GREEN}🎉 Port cleanup completed!${NC}"
echo -e "${YELLOW}💡 You can now run 'pnpm run dev' to start all applications${NC}"