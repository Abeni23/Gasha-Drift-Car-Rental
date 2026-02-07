#!/bin/bash

set -e

echo "🚀 Starting Gasha Drift Car Rental..."

# Start Docker services
echo "📦 Starting Docker services (PostgreSQL & MinIO)..."
docker-compose up -d

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    docker-compose down
    exit 0
}
trap cleanup INT TERM

# Start API
echo "🔧 Starting API server..."
cd api
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
pnpm start:dev &
API_PID=$!
cd ..

# Start Frontend
echo "🎨 Starting Frontend dev server..."
cd frontend
npm install 2>/dev/null || true
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ All services started!"
echo "  - API: http://localhost:3000"
echo "  - Frontend: http://localhost:5173"
echo "  - MinIO Console: http://localhost:9001"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait $API_PID $FRONTEND_PID
