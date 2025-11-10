#!/bin/bash
# Simple script to run development server with correct Node version

# Check if we're already using Node 22+
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [ "$NODE_VERSION" -ge 22 ]; then
        echo "✅ Using Node.js $(node -v) - compatible!"
        npm run dev "$@"
        exit 0
    fi
fi

# Try to use nvm if available
if command -v nvm &> /dev/null; then
    echo "📋 Using nvm to switch to Node 22..."
    nvm use
    npm run dev "$@"
    exit 0
fi

# Try homebrew Node 22 if available
if [ -f "/opt/homebrew/opt/node@22/bin/node" ]; then
    echo "📋 Using Homebrew Node 22..."
    PATH="/opt/homebrew/opt/node@22/bin:$PATH" npm run dev "$@"
    exit 0
fi

# If none found, show helpful message
echo "❌ Node.js 22+ is required but not found."
echo ""
echo "Please install Node.js 22+ using one of these methods:"
echo "1. nvm: nvm install 22 && nvm use 22"
echo "2. Homebrew: brew install node@22"
echo "3. Download from: https://nodejs.org/"
echo ""
echo "This project includes a .nvmrc file - just run 'nvm use' if you have nvm."
exit 1