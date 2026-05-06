# Taskify

Taskify is a full-stack task management app with a React frontend and an Express + MongoDB backend. It includes authentication, role-based access, project and task management, activity tracking, notifications, and a dashboard-style UI.

## Features

- User signup and login with JWT authentication
- Role-based access for Admin and Member users
- Create, update, delete, and view projects
- Create, update, delete, and filter tasks
- Activity and notification feeds
- Dashboard pages with task progress and project widgets
- Responsive frontend built with Vite and React Router

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, CORS
- Database: MongoDB
- Deployment: Vercel for frontend, Railway for backend

## Prerequisites

- Node.js 18 or newer
- MongoDB connection string
- Git

## Environment Variables

Create a `.env` file in `backend/` with:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

For the frontend, you can optionally create `frontend/.env`:

```env
VITE_API_BASE_URL=https://taskify-production-d4ca.up.railway.app/api
```

If `VITE_API_BASE_URL` is not set, the frontend uses the Railway backend URL by default.

## Run Locally

### 1) Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:5000` by default.

### 2) Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

## Build

### Frontend production build

```bash
cd frontend
npm run build
```

### Backend production start

```bash
cd backend
npm start
```

## API Base URL

The frontend API client is configured in `frontend/src/api/index.js` and points to:

```text
https://taskify-production-d4ca.up.railway.app/api
```

You can override this with `VITE_API_BASE_URL` when needed.

## Deployment Notes

- Frontend is configured for Vercel with SPA rewrites in `frontend/vercel.json`
- Backend is configured with CORS allowlist for local development and the hosted frontend
- If you deploy the frontend to a new domain, add that domain to the backend CORS allowlist in `backend/server.js`

## Main Routes

- `/` - Marketing homepage
- `/login` - Login screen
- `/signup` - Signup screen
- `/dashboard` - App dashboard

## Backend API Routes

- `/api/auth/signup`
- `/api/auth/login`
- `/api/auth/users`
- `/api/projects`
- `/api/tasks`
- `/api/activities`

## Notes

- Passwords are hashed before saving in MongoDB
- Protected routes require a Bearer token in the `Authorization` header
- The frontend stores the token and user data in `localStorage`
