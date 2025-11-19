# 🔧 Quick Fix: Node.js PATH Issue

## The Problem
`'node' is not recognized` means Node.js isn't in your PATH.

## ✅ Solution 1: Use the Helper Scripts (Easiest)

I've created helper scripts that fix the PATH automatically:

### Start Backend:
```powershell
cd backend
.\start-dev.ps1
```

### Start Frontend:
```powershell
.\start-frontend.ps1
```

## ✅ Solution 2: Add to PATH for Current Session

In your VS Code terminal, run this **once per terminal session**:

```powershell
$env:Path += ";C:\Program Files\nodejs"
```

Then you can use `npm` and `node` normally:
```powershell
cd backend
npm run dev
```

## ✅ Solution 3: Add to System PATH (Permanent)

This makes Node.js available everywhere:

1. Press **Windows Key + R**
2. Type: `sysdm.cpl` and press Enter
3. Click **"Advanced"** tab
4. Click **"Environment Variables"**
5. Under **"System variables"**, find **"Path"** and click **"Edit"**
6. Click **"New"**
7. Add: `C:\Program Files\nodejs`
8. Click **OK** on all dialogs
9. **Restart VS Code** (important!)

After restarting VS Code, `npm` and `node` will work everywhere.

## 🚀 Recommended: Use Solution 1 (Helper Scripts)

Just run:
```powershell
# Terminal 1
cd backend
.\start-dev.ps1

# Terminal 2 (new terminal)
.\start-frontend.ps1
```

This is the easiest and doesn't require changing system settings!


