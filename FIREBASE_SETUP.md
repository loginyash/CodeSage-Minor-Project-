# Firebase Setup Guide for Code Sage

Follow these steps to configure Firebase Authentication for your project.

## 1. Create a Firebase Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"** (or "Create a project").
3.  Enter a project name (e.g., `code-sage-app`) and click **Continue**.
4.  Disable Google Analytics for this project (optional, simpler for now) and click **Create project**.
5.  Wait for the project to be ready and click **Continue**.

## 2. Register Your Web App
1.  In the project overview page, click the **Web icon** (`</>`) to add a web app.
2.  Enter an App nickname (e.g., `Code Sage Web`).
3.  Click **Register app**.
4.  **IMPORTANT**: You will see a code block with `firebaseConfig`. Keep this tab open or copy the `const firebaseConfig = { ... }` object. You will need this for Step 4.

## 3. Enable Authentication
1.  In the left sidebar, click on **Build** > **Authentication**.
2.  Click **Get started**.
3.  Select **Email/Password** from the Sign-in method list.
4.  Toggle **Enable** to ON.
5.  Click **Save**.

## 4. Configure the Frontend
1.  Open the file `src/lib/firebase.ts` in your code editor.
2.  Replace the placeholder `firebaseConfig` object with the one you copied in Step 2.

It should look like this:

```typescript
// src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "code-sage-app.firebaseapp.com",
  projectId: "code-sage-app",
  storageBucket: "code-sage-app.appspot.com",
  messagingSenderId: "123456...",
  appId: "1:123456..."
};
```

## 5. (Optional) Backend Verification Setup
For the backend to securely verify tokens, you ideally need the Firebase Admin SDK setup.
1.  In Firebase Console, go to **Project settings** (gear icon) > **Service accounts**.
2.  Click **Generate new private key**.
3.  Save the JSON file as `serviceAccountKey.json` in your `backend/` directory.
4.  Update `backend/app/api/auth.py` to point to this file (currently it uses a mock verification for simplicity).

## 6. Restart and Test
1.  Restart your frontend: `npm run dev`
2.  Restart your backend: `python backend/run.py`
3.  Go to the Signup page and create an account!
