#!/bin/bash
set -e

# Load environment variables if .env file exists on the host
if [ -f .env ]; then
  echo "Loading variables from .env file..."
  export $(grep -v '^#' .env | xargs)
fi

echo "⚠️ Starting Emergency Rollback..."

# Determine which container is currently running under Nginx
# (We check the active Nginx symlink target)
NGINX_CONF_PATH="/etc/nginx/sites-enabled/aigrowthexa"

if [ ! -L "$NGINX_CONF_PATH" ]; then
  echo "❌ Error: Nginx symlink does not exist at $NGINX_CONF_PATH."
  echo "Are you running this script on the target EC2 host where Nginx is configured?"
  exit 1
fi

CURRENT_TARGET=$(readlink "$NGINX_CONF_PATH")

if [[ "$CURRENT_TARGET" == *"blue"* ]]; then
  ACTIVE_COLOR="blue"
  ROLLBACK_COLOR="green"
  ROLLBACK_PORT="8082"
else
  ACTIVE_COLOR="green"
  ROLLBACK_COLOR="blue"
  ROLLBACK_PORT="8081"
fi

echo "🟢 Currently active stack in Nginx: $ACTIVE_COLOR"
echo "🔄 Rolling back traffic to: $ROLLBACK_COLOR (Port $ROLLBACK_PORT)"

# Check if rollback containers are currently running, if not start them
if ! docker ps --format '{{.Names}}' | grep -q "aigrowthexa_client_$ROLLBACK_COLOR"; then
  echo "⚠️ Rollback stack containers not running. Booting them..."
  docker compose -f docker-compose.$ROLLBACK_COLOR.yml up -d
  sleep 5
fi

# Switch Traffic
echo "Reverting Nginx symlink..."
sudo ln -sf "/etc/nginx/sites-available/aigrowthexa_$ROLLBACK_COLOR" "$NGINX_CONF_PATH"

echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "Swapped traffic successfully!"
sleep 3

# Shut down the buggy stack
echo "🧹 Stopping the buggy active stack ($ACTIVE_COLOR)..."
docker compose -f docker-compose.$ACTIVE_COLOR.yml down

echo "✅ Rollback completed successfully! Traffic is now on $ROLLBACK_COLOR."
