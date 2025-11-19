# 🚀 Complete Setup Guide

This guide will help you get both the frontend and backend running.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

## 📦 Step 1: Install Backend Dependencies

Open a terminal and run:

```bash
cd backend
npm install
```

This installs all backend packages (Express, TypeScript, etc.)

## 📦 Step 2: Install Frontend Dependencies

Open a **new terminal** (keep the first one open) and run:

```bash
# Make sure you're in the project root (not in backend folder)
npm install
```

## 🎯 Step 3: Start the Backend Server

In the first terminal (where you installed backend deps):

```bash
cd backend
npm run dev
```

You should see:
```
Backend server running on port 4000
```

✅ Backend is now running at **http://localhost:4000**

## 🎨 Step 4: Start the Frontend

In the second terminal (project root):

```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:8080/
```

✅ Frontend is now running at **http://localhost:8080**

## 🧪 Test It Out

1. Open **http://localhost:8080** in your browser
2. You should see the homepage with learning paths
3. Scroll down to the feedback section
4. Try submitting feedback - it should save to `backend/db/data.json`

## 📁 What Was Created

### Backend (`/backend`)
- ✅ Express.js server with TypeScript
- ✅ MVC folder structure
- ✅ JSON file database
- ✅ API endpoints for lessons and feedback
- ✅ CORS enabled for frontend communication
- ✅ Error handling middleware

### Frontend (`/src`)
- ✅ API client utilities (`src/api/`)
- ✅ TypeScript types (`src/types/api.ts`)
- ✅ Integrated API calls in components
- ✅ Loading and error states

## 🔍 Troubleshooting

### "npm is not recognized"
- Make sure Node.js is installed
- Restart your terminal
- Try using `node --version` to verify

### Backend won't start
- Make sure you're in the `backend` folder
- Check that `npm install` completed successfully
- Look for error messages in the terminal

### Frontend can't connect to backend
- Make sure backend is running on port 4000
- Check browser console for CORS errors
- Verify `VITE_API_URL` in `.env` if you set one

### Port already in use
- Change the port in `backend/src/server.ts` (line 3)
- Or set `PORT=3000` environment variable

## 📝 Next Steps

- The backend uses a JSON file for storage - perfect for development
- When ready, you can swap to a real database (PostgreSQL, MongoDB, etc.)
- All TypeScript types are shared between frontend and backend

## 🎉 You're All Set!

You now have a full-stack application running:
- **Frontend**: React + Vite + TypeScript + Tailwind
- **Backend**: Node.js + Express + TypeScript
- **Database**: JSON file (simple and works!)

Happy coding! 🎊




