# SimpleTask Frontend (Vite + React)

## Setup

1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Features

- Login/Signup (Auth)
- Task CRUD (Create, Read, Update, Delete)
- Pagination, AJAX loading
- Task assignment, status, & priorities (color-coded)
- Confirmation dialogs for delete
- User management & task assignment
- Move tasks between priority lists

## Structure

- `/src/components/` - React components (TaskList, TaskForm, AuthForm, etc.)
- `/src/pages/` - Main pages (Login, Dashboard, TaskDetails, etc.)
- `/src/api/` - API handlers for backend integration
- `/src/context/` - Auth and App context providers

Edit `/src/api/index.js` to match your backend endpoints.