#!/bin/bash
set -e

# Load environment variables if .env file exists on the host
if [ -f .env ]; then
  echo "Loading variables from .env file..."
  export $(grep -v '^#' .env | xargs)
fi

# Ensure mandatory variables are set
if [ -z "$DOCKER_HUB_USERNAME" ] || [ -z "$IMAGE_TAG" ]; then
  echo "❌ Error: DOCKER_HUB_USERNAME and IMAGE_TAG must be set!"
  exit 1
fi

echo "🚀 Starting Blue-Green Deployment..."
echo "📦 Image Tag: $IMAGE_TAG"

# Ensure external bridge network exists
docker network create aigrowthexa_prod_network || true

# Start MongoDB if it isn't running (only applicable if running DB locally on container)
if [ -f docker-compose.db.yml ]; then
  echo "Ensure local MongoDB container is running..."
  docker compose -f docker-compose.db.yml up -d
fi

# Determine active environment based on running containers
if docker ps --format '{{.Names}}' | grep -q 'aigrowthexa_client_blue'; then
  ACTIVE_COLOR="blue"
  NEW_COLOR="green"
  NEW_PORT="8082"
  NEW_SERVER_PORT="5002"
else
  # Default to blue if green is running, or if it is the first bootstrap run
  ACTIVE_COLOR="green"
  NEW_COLOR="blue"
  NEW_PORT="8081"
  NEW_SERVER_PORT="5001"
fi

echo "🟢 Active stack: $ACTIVE_COLOR"
echo "🔵 Deploying to stack: $NEW_COLOR (Client: Port $NEW_PORT, Server: Port $NEW_SERVER_PORT)"

# Pull latest images
echo "Pulling latest Docker images..."
export DOCKER_HUB_USERNAME=$DOCKER_HUB_USERNAME
export IMAGE_TAG=$IMAGE_TAG
docker compose -f docker-compose.$NEW_COLOR.yml pull

# Start the new environment
echo "Starting new container stack..."
docker compose -f docker-compose.$NEW_COLOR.yml up -d

# Perform health checks on the new backend server
echo "Running health checks on http://localhost:$NEW_SERVER_PORT/api/health..."
HEALTHY=false
for i in {1..15}; do
  # Run HTTP request to health check route, verify status code and UP payload
  RESPONSE=$(curl -s http://localhost:$NEW_SERVER_PORT/api/health || true)
  if echo "$RESPONSE" | grep -q '"status":"UP"'; then
    echo "✅ New stack ($NEW_COLOR) is healthy and ready!"
    HEALTHY=true
    break
  fi
  echo "⏳ Waiting for server to boot... (attempt $i/15)"
  sleep 4
done

if [ "$HEALTHY" = false ]; then
  echo "❌ Error: New stack ($NEW_COLOR) failed health check. Rolling back."
  echo "Stopping faulty container stack..."
  docker compose -f docker-compose.$NEW_COLOR.yml down
  exit 1
fi

# Switch Traffic at Host Nginx Level
NGINX_CONF_PATH="/etc/nginx/sites-enabled/aigrowthexa"
NGINX_AVAILABLE_PATH="/etc/nginx/sites-available/aigrowthexa_$NEW_COLOR"

if [ -f "$NGINX_AVAILABLE_PATH" ]; then
  echo "Swapping Nginx config symlink to point to $NEW_COLOR..."
  sudo ln -sf "$NGINX_AVAILABLE_PATH" "$NGINX_CONF_PATH"
  echo "Reloading Host Nginx configuration..."
  sudo systemctl reload nginx
else
  # Fallback for manual or simple host configurations if symlinks aren't set up yet
  echo "⚠️ Warning: Nginx sites-available files not found. Please ensure host Nginx is configured."
fi

# Let new container take over current traffic before tearing down old stack
echo "Transitioning traffic to the new stack..."
sleep 5

# Clean up old stack
if [ "$ACTIVE_COLOR" != "$NEW_COLOR" ] && docker ps --format '{{.Names}}' | grep -q "aigrowthexa_client_$ACTIVE_COLOR"; then
  echo "🧹 Cleaning up old stack ($ACTIVE_COLOR)..."
  docker compose -f docker-compose.$ACTIVE_COLOR.yml down
else
  echo "First bootstrap deployment complete. No old stack to clean up."
fi

echo "🎉 Deployment successfully completed to $NEW_COLOR stack!"
