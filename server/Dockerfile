# ==========================================
# Production Dockerfile for Node.js Server
# ==========================================
FROM node:20-alpine

# Set to production environment
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first for Docker caching layer
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy remaining source code and set ownership
COPY --chown=node:node src/ ./src/

# Expose backend port
EXPOSE 5001

# Run container as a non-privileged user for security
USER node

# Start script
CMD ["node", "src/server.js"]
