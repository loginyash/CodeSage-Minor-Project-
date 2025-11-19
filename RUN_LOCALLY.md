# 🚀 How to Run Locally

## Quick Start (3 Steps)

### Step 1: Start Backend Server

Open **Terminal 1** in VS Code (`Ctrl + `` `):

```powershell
cd backend
.\start-dev.ps1
```

**Wait for this message:**
```
Backend server running on port 4000
```

✅ Backend is now running at **http://localhost:4000**

### Step 2: Start Frontend Server

Open **Terminal 2** in VS Code (click **+** or `Ctrl + Shift + `` `):

```powershell
.\start-frontend.ps1
```

**Wait for this message:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:8080/
```

✅ Frontend is now running at **http://localhost:8080**

### Step 3: Open in Browser

Click the link **http://localhost:8080** or manually open it in your browser.

## 🎉 That's It!

You should now see:
- ✅ Your website running locally
- ✅ Lessons loading from the backend
- ✅ Feedback form working
- ✅ All features functional

## 📊 What's Running?

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:8080 | Your website |
| **Backend API** | http://localhost:4000 | API server |

## 🔍 Verify It's Working

1. **Check Backend:** Open http://localhost:4000/api/lessons
   - Should show JSON with lessons

2. **Check Frontend:** Open http://localhost:8080
   - Should show your homepage with lessons

3. **Test Feedback:** 
   - Fill out the feedback form
   - Submit it
   - Check `backend/db/data.json` - your feedback should be saved there!

## 🛑 How to Stop

Press **`Ctrl + C`** in each terminal to stop the servers.

## 🐛 Troubleshooting

**"Port already in use"**
- Another app is using port 4000 or 8080
- Close other terminals or apps using those ports
- Or change ports in config files

**"Cannot find module"**
- Make sure you ran `npm install` in both folders
- Check that `node_modules` folders exist

**Scripts won't run**
- Try the `.bat` files instead: `.\start-dev.bat`
- Or manually add PATH: `$env:Path += ";C:\Program Files\nodejs"`

## 💡 Pro Tips

- **Keep both terminals open** - servers need to keep running
- **Split terminals** in VS Code to see both at once
- **Check terminal output** for any error messages
- **Backend data** is saved in `backend/db/data.json`


