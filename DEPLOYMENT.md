# 🚀 Deployment Guide

This guide will help you deploy your Learn Code Cheer application so anyone can access it online!

## 📋 Prerequisites

- A GitHub account (free)
- Your code pushed to GitHub (we already did this!)

## 🎯 Deployment Strategy

We'll deploy:
- **Backend** → Render (free tier, perfect for Express.js)
- **Frontend** → Vercel (free tier, perfect for React/Vite)

Both services offer free tiers that are perfect for getting started!

---

## 🔧 Step 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account (free)

### 1.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your `learn-code-cheer-main` repository

### 1.3 Configure Backend Service
Fill in these settings:

- **Name**: `learn-code-cheer-backend`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`
- **Plan**: `Free`

### 1.4 Add Environment Variables
Click **"Environment"** and add:
- `NODE_ENV` = `production`
- `PORT` = `4000` (Render will override this, but it's good to have)

### 1.5 Deploy!
Click **"Create Web Service"** and wait for deployment (~5-10 minutes)

### 1.6 Get Your Backend URL
Once deployed, you'll see a URL like:
```
https://learn-code-cheer-backend.onrender.com
```
**Copy this URL** - you'll need it for the frontend!

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account (free)

### 2.2 Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Import your `learn-code-cheer-main` repository
3. Click **"Import"**

### 2.3 Configure Frontend
Vercel will auto-detect Vite, but verify:

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.4 Add Environment Variable
Click **"Environment Variables"** and add:
- **Key**: `VITE_API_URL`
- **Value**: Your Render backend URL (from Step 1.6)
  - Example: `https://learn-code-cheer-backend.onrender.com`

### 2.5 Deploy!
Click **"Deploy"** and wait (~2-3 minutes)

### 2.6 Get Your Frontend URL
Once deployed, you'll get a URL like:
```
https://learn-code-cheer-main.vercel.app
```
**This is your live website!** 🎉

---

## ✅ Step 3: Test Your Deployment

1. Visit your Vercel URL
2. Check if the website loads
3. Try browsing courses
4. Test the feedback form
5. Watch a video tutorial

---

## 🔄 Updating Your Deployment

Whenever you push changes to GitHub:

- **Render** will automatically redeploy your backend
- **Vercel** will automatically redeploy your frontend

No manual steps needed! Just `git push` and wait a few minutes.

---

## 🆓 Free Tier Limits

### Render (Backend)
- ✅ Free tier available
- ⚠️ Spins down after 15 minutes of inactivity (first request takes ~30 seconds)
- 💡 Upgrade to paid for always-on service

### Vercel (Frontend)
- ✅ Free tier available
- ✅ Always-on, no spin-down
- ✅ Perfect for frontend hosting

---

## 🐛 Troubleshooting

### Backend not responding?
- Check Render logs: Go to your service → **"Logs"** tab
- Verify environment variables are set correctly
- Make sure `PORT` is set (Render provides this automatically)

### Frontend can't connect to backend?
- Verify `VITE_API_URL` in Vercel matches your Render backend URL
- Check CORS settings (should be enabled in `backend/src/app.ts`)
- Make sure backend URL doesn't have a trailing slash

### Build fails?
- Check the logs in Render/Vercel
- Make sure all dependencies are in `package.json`
- Verify Node.js version compatibility

---

## 🎉 You're Live!

Once deployed, share your Vercel URL with anyone - they can access your learning platform from anywhere in the world!

---

## 📝 Quick Reference

- **Backend URL**: `https://your-backend.onrender.com`
- **Frontend URL**: `https://your-app.vercel.app`
- **API Endpoints**: 
  - `GET /api/lessons`
  - `GET /api/feedback`
  - `POST /api/feedback`

---

Need help? Check the logs in Render and Vercel dashboards for detailed error messages!

