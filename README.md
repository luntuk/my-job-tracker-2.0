# My Job Tracker

A full-stack job tracking app with React, Vite, Express and MongoDB.

## Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas or local MongoDB

### Setup

```bash
# 1. Install backend and frontend dependencies
npm run setup-project

# 2. Copy .env example and set your MongoDB URL
# Windows:
copy .env.example .env
# macOS / Linux:
# cp .env.example .env

# 3. Update .env with your MongoDB connection string
# Example: MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/my-job-tracker?retryWrites=true&w=majority

# 4. (Optional) Seed sample jobs for testing
node populate.js

# 5. Start backend and frontend together
npm run dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:5000

> No live deployment is available for this repository at the moment.

---

## What this project includes

- User registration and login with JWT
- Protected job routes for creating and deleting jobs
- Dashboard with job filters and statistics
- User profile page
- Responsive React UI built with Vite
- Express server with Mongoose models and middleware

---

## Project structure

```
my-job-tracker/
├── client/              # React + Vite frontend
├── controllers/         # Express route handlers
├── middleware/          # Auth, validation, error handling
├── models/              # Mongoose schemas
├── routes/              # Backend API routes
├── utils/               # Helpers and auth utilities
├── server.js            # Express server entrypoint
└── populate.js          # Optional seed script
```

---

## Available scripts

- `npm run setup-project` — install backend and frontend dependencies
- `npm run dev` — start backend and frontend in development
- `npm run server` — start backend with nodemon
- `npm run client` — start frontend dev server

---

## API endpoints

### Auth
- `POST /api/v1/auth/register` — register a new user
- `POST /api/v1/auth/login` — authenticate user and return token
- `GET /api/v1/auth/me` — get current authenticated user

### Jobs (protected)
- `GET /api/v1/jobs` — list jobs for current user
- `POST /api/v1/jobs` — create a new job
- `PATCH /api/v1/jobs/:id` — update a job
- `DELETE /api/v1/jobs/:id` — delete a job

---

## Environment variables

```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/my-job-tracker?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_32_chars
JWT_EXPIRES_IN=1d
```

---

## Notes

- The frontend and backend are separate packages in the same repository.
- Use `npm run setup-project` once after cloning.
- If you run into auth issues, clear `localStorage` and log in again.

---

## What I would improve

- Remove unused admin/stats pages and the extra backend routes that are not part of the core job tracker flow.
- Simplify the frontend to avoid importing backend-only constants and reduce runtime coupling.
- Add a proper `/auth/me` session endpoint and use token-based dashboard protection instead of localStorage state.
- Add tests for auth and job edit flows, including partial PATCH requests.

---

**Made by a Daniil Dzis**
