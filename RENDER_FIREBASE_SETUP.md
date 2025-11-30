# Firebase Environment Variables Setup for Render

To fix the "Authentication token error", you need to set up Firebase environment variables on Render.

## Required Environment Variables

Go to your Render dashboard → Your backend service → Environment → Add the following variables:

### 1. Get Firebase Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click gear icon ⚙️ → Project settings
4. Go to "Service accounts" tab
5. Click "Generate new private key"
6. Download the JSON file

### 2. Extract Values from JSON and Set on Render

From your downloaded `serviceAccountKey.json`, extract these values and add them as environment variables on Render:

```
FIREBASE_PROJECT_ID = <value from "project_id">
FIREBASE_PRIVATE_KEY_ID = <value from "private_key_id">
FIREBASE_PRIVATE_KEY = <value from "private_key"> (keep the quotes and \n characters as-is)
FIREBASE_CLIENT_EMAIL = <value from "client_email">
FIREBASE_CLIENT_ID = <value from "client_id">
FIREBASE_CLIENT_CERT_URL = <value from "client_x509_cert_url">
```

### Important Notes:

- For `FIREBASE_PRIVATE_KEY`: Copy the entire value including the quotes and `\n` characters
  - Example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQI...your_key_here...\n-----END PRIVATE KEY-----\n"`
  
- Make sure there are NO extra spaces before or after the values

### 3. Redeploy on Render

After adding all environment variables, Render will automatically redeploy your backend. Check the logs - you should see:
```
Firebase initialized with environment variables
```

Instead of:
```
Warning: serviceAccountKey.json not found
```

## Verification

After deployment completes:
1. Try signing up on your website
2. The "Authentication token error" should be resolved
3. Token verification should now work properly
