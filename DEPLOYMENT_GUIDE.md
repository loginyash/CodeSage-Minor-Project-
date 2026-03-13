# CodeSage Deployment Guide
This guide covers how to deploy the CodeSage application's backend to Render and frontend to Vercel.

## 1. Backend Deployment (Render)

Render is ideal for hosting our Flask/Python backend and Firebase administration logic.

### Prerequisites:
* A Render account (https://render.com)
* The GitHub repository containing your CodeSage code connected to Render.

### Steps:
1.  **Dashboard Access:** Log in to your Render dashboard and click **New +** > **Web Service**.
2.  **Connect Repository:** Select the Git repository containing your CodeSage project.
3.  **Service Configuration:**
    *   **Name:** `codesage-backend` (or similar)
    *   **Language:** Python
    *   **Branch:** `main` (or whichever branch you wish to deploy)
    *   **Root Directory:** `backend` (Important! Tell Render to look inside the backend folder).
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `gunicorn run:app` (You may need to add `gunicorn` to your `requirements.txt` if you haven't already).
4.  **Environment Variables:**
    *   Scroll down to the Environment Variables section.
    *   Add your Firebase Admin SDK credentials exactly as they appear in your local `.env` file (e.g., `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`).
5.  **Deploy:** Click **Create Web Service**. Render will now build and deploy the application. Once it finishes, it will provide you with a live URL (e.g., `https://codesage-backend-xyz.onrender.com`).
6.  *Copy this live Render URL - you will need it for the Frontend deployment!*

---

## 2. Frontend Deployment (Vercel)

Vercel is optimized for building and serving Vite/React frontend applications quickly.

### Prerequisites:
* A Vercel account (https://vercel.com)
* The same GitHub repository connected to Vercel.

### Steps:
1.  **Dashboard Access:** Log in to Vercel and click **Add New** > **Project**.
2.  **Import Repository:** Select your CodeSage Git repository.
3.  **Project Configuration:**
    *   **Framework Preset:** Vercel should automatically detect `Vite`. If it doesn't, select `Vite` from the dropdown.
    *   **Root Directory:** If your frontend is at the top level of the repo (where `package.json` and `vite.config.ts` live), leave this as `./`.
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
4.  **Environment Variables:**
    *   Expand the Environment Variables section.
    *   Add `VITE_API_URL`.
    *   Set its value to the **live Render URL** you obtained in the previous step (e.g., `https://codesage-backend-xyz.onrender.com`).
    *   Also add your Firebase config variables (e.g., `VITE_FIREBASE_API_KEY`, etc.) as they appear in your local `.env`.
5.  **Deploy:** Click **Deploy**. Vercel will bundle the Vite app and assign you a live production URL.

### Final Verification
Once both deployments are successful:
1. Navigate to your Vercel frontend URL.
2. Check that the UI renders perfectly (including mobile views, grid backgrounds, and custom fonts).
3. Interact with the Community page to ensure data is successfully fetched from your live Render backend database.
