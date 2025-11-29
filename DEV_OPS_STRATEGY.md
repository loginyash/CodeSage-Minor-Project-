# DEV OPS STRATEGY: Code Sage

## Overview
This document outlines the strategy for containerizing the application and setting up a CI/CD pipeline to ensure smooth deployment and high quality.

## Containerization (Docker)

We will use a multi-container setup with Docker Compose for local development and individual Dockerfiles for production deployment.

### Backend (`backend/Dockerfile`)
- **Base Image**: `python:3.9-slim`
- **Steps**:
  1. Install system dependencies.
  2. Copy `requirements.txt` and install Python packages.
  3. Copy application code.
  4. Expose port 5000.
  5. Command: `gunicorn -w 4 -b 0.0.0.0:5000 run:app`

### Frontend (`Dockerfile`)
- **Base Image**: `node:18-alpine` (Build Stage) -> `nginx:alpine` (Serve Stage)
- **Steps**:
  1. Install dependencies (`npm install`).
  2. Build the app (`npm run build`).
  3. Copy `dist` folder to Nginx html directory.
  4. Configure Nginx for SPA (Single Page Application) routing.

### Orchestration (`docker-compose.yml`)
- **Services**:
  - `backend`: Maps port 5000:5000.
  - `frontend`: Maps port 8080:80.
  - `db`: PostgreSQL container (for local dev).

## CI/CD Pipeline (GitHub Actions)

We will create a `.github/workflows/main.yml` file to automate testing and deployment.

### Workflow Triggers
- Push to `main` branch.
- Pull Requests to `main`.

### Jobs

#### 1. Test Backend
- Set up Python environment.
- Install dependencies.
- Run `pytest`.

#### 2. Test Frontend
- Set up Node.js environment.
- Install dependencies.
- Run `npm run lint` and `npm test` (if available).

#### 3. Build & Deploy (Production)
- **Condition**: Only on push to `main`.
- **Steps**:
  - Build Docker images.
  - Push to Container Registry (e.g., Docker Hub or GitHub Container Registry).
  - Trigger deployment webhook (Render/Vercel).

## Deployment Targets
- **Frontend**: Vercel (optimized for React/Vite) or Render (Static Site).
- **Backend**: Render (Web Service) or Railway.
- **Database**: Neon (Serverless Postgres) or Render (Managed Postgres).
