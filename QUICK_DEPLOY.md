# ⚡ Quick Deployment Guide

Get your app live in 10 minutes! Follow these simple steps:

## 🎯 Two-Step Deployment

### Step 1: Deploy Backend (5 minutes)

1. **Go to [render.com](https://render.com)** and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo: `learn-code-cheer-main`
4. Configure:
   - **Name**: `learn-code-cheer-backend`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: `Free`
5. Click **"Create Web Service"**
6. **Wait 5-10 minutes** for deployment
7. **Copy your backend URL** (e.g., `https://learn-code-cheer-backend.onrender.com`)

### Step 2: Deploy Frontend (5 minutes)

1. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your repo: `learn-code-cheer-main`
4. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: Your backend URL from Step 1
5. Click **"Deploy"**
6. **Wait 2-3 minutes**
7. **Done!** Your app is live! 🎉

## 🔗 Your Live URLs

- **Frontend**: `https://your-app.vercel.app` ← Share this!
- **Backend**: `https://your-backend.onrender.com`

## ✅ Test It

1. Open your Vercel URL
2. Browse courses
3. Watch videos
4. Submit feedback

Everything should work! 🚀

## 📝 Need More Details?

See `DEPLOYMENT.md` for the complete guide with troubleshooting.

