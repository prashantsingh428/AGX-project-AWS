# Ai Growth Exa

MERN Stack application for Ai Growth Exa - AI Based Marketing Agency.

## Structure
- `client/`: React + Vite Frontend
- `server/`: Node + Express Backend

## Getting Started

1. **Install Dependencies** (if not already done):
   ```bash
   npm install        # Root
   cd client && npm install
   cd server && npm install
   ```

2. **Run Development Mode**:
   ```bash
   npm run dev
   ```
   This runs both client (localhost:5173) and server (localhost:5000) concurrently.

## Environment Variables
- Server expects `MONGO_URI` (default: local) and `PORT` (default: 5000) in `server/.env`.

## Docker Development

To run the application locally using Docker Compose (which includes MongoDB, the Express backend, and the React Vite client):

```bash
docker compose up -d
```
The client will be available at `http://localhost:5173` and the server at `http://localhost:5001`.

## Production Deployment

This project includes a Blue-Green deployment script.
1. Ensure your Docker Hub username and image tags are set in the `.env` file (`DOCKER_HUB_USERNAME` and `IMAGE_TAG`).
2. Run the deploy script:
```bash
./deploy/deploy.sh
```
This script handles zero-downtime deployment by switching traffic between active and new container stacks using Nginx.
