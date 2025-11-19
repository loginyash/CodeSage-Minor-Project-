# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: "ts-node-dev" not found or errors

**Solution:** Try using `tsx` instead (faster and more reliable):

```powershell
cd backend
$env:Path += ";C:\Program Files\nodejs"
npm install -D tsx
```

Then update `backend/package.json` script:
```json
"dev": "tsx watch src/server.ts"
```

### Issue 2: "Cannot find module" errors

**Check:**
1. Are you in the right folder? (`cd backend`)
2. Did `npm install` complete? Check for `node_modules` folder
3. Try reinstalling: `npm install`

### Issue 3: Port already in use

**Check what's using the port:**
```powershell
netstat -ano | findstr :4000
netstat -ano | findstr :8080
```

**Kill the process** or change ports in:
- Backend: `backend/src/server.ts` (line 3)
- Frontend: `vite.config.ts` (line 10)

### Issue 4: Scripts won't execute

**PowerShell execution policy:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Or use batch files instead:**
```powershell
.\start-dev.bat
```

### Issue 5: "node" not recognized

**Add to PATH manually in terminal:**
```powershell
$env:Path += ";C:\Program Files\nodejs"
```

**Then verify:**
```powershell
node --version
npm --version
```

## Step-by-Step Debugging

### Step 1: Verify Node.js works
```powershell
$env:Path += ";C:\Program Files\nodejs"
node --version
```
Should show: `v24.11.1` or similar

### Step 2: Check backend dependencies
```powershell
cd backend
$env:Path += ";C:\Program Files\nodejs"
npm list
```
Should show installed packages

### Step 3: Try running backend directly
```powershell
cd backend
$env:Path += ";C:\Program Files\nodejs"
npx ts-node-dev --respawn --transpile-only --esm src/server.ts
```

### Step 4: Check for TypeScript errors
```powershell
cd backend
$env:Path += ";C:\Program Files\nodejs"
npm run build
```
Should compile without errors

## Alternative: Use tsx (Recommended)

`tsx` is more reliable than `ts-node-dev` for ES modules:

```powershell
cd backend
$env:Path += ";C:\Program Files\nodejs"
npm install -D tsx
```

Then change `package.json`:
```json
"dev": "tsx watch src/server.ts"
```

## Still Not Working?

Share the **exact error message** you're seeing and I'll help fix it!


