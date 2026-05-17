# SimPulse Backend (MVP)

Production-ready backend foundation for SimPulse using Express, TypeScript, Prisma, and PostgreSQL (Neon), deployable on Railway.

## Stack

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Railway deployment target

## Features

- REST API for events and posts
- Region-aware events with strict case preservation
- LSL-optimized board endpoint
- Security baseline: helmet, cors, request validation, LSL rate limiting
- Centralized error handling
- Service-layer architecture (controllers do not access Prisma directly)

## Project structure

- src/config
- src/controllers
- src/routes
- src/services
- src/middleware
- src/utils
- src/types
- src/db

## Environment variables

Copy .env.example to .env and fill values:

- DATABASE_URL
- PORT
- NODE_ENV
- API_SECRET

Optional:

- ENFORCE_API_KEY=true to enable x-api-key checks on main REST endpoints

## Local development

1. Install dependencies

npm install

2. Generate Prisma client

npm run prisma:generate

3. Apply migrations to your Neon database

npm run prisma:migrate

4. Start dev server

npm run dev

Server default URL:

http://localhost:3001

## Railway deployment

1. Create a Railway project and connect this repository.
2. Set root directory to server.
3. Add Railway environment variables:
   - DATABASE_URL (Neon connection string)
   - PORT (Railway runtime port)
   - NODE_ENV=production
   - API_SECRET
4. Railway uses railway.json for build/start commands.

## REST endpoints

- GET /health
- GET /events
- GET /events?region=REGION_NAME
- GET /events/:id
- POST /events
- PUT /events/:id
- DELETE /events/:id
- GET /posts
- POST /posts
- GET /lsl/events?region=REGION_NAME

## LSL endpoint format

GET /lsl/events returns text/plain:

title|time
title|time

Time is formatted as HH:mm (UTC).

## Scalability readiness (not implemented yet)

The architecture is prepared for:

- Redis caching layer
- WebSocket event fan-out
- horizontal scaling behind load balancers

No microservices and no auth system are implemented at this stage.
