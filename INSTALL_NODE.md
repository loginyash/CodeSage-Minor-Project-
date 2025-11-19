# 📦 Install Node.js First

You need to install **Node.js** before you can run `npm install`. Node.js includes `npm` (Node Package Manager).

## 🚀 Quick Installation

### Option 1: Download from Official Website (Recommended)

1. Go to **https://nodejs.org/**
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Follow the installation wizard
5. **Restart your terminal/IDE** after installation

### Option 2: Using a Package Manager

**Windows (using Chocolatey):**
```powershell
choco install nodejs
```

**Windows (using Winget):**
```powershell
winget install OpenJS.NodeJS.LTS
```

## ✅ Verify Installation

After installing Node.js, **restart your terminal** and run:

```bash
node --version
npm --version
```

You should see version numbers (e.g., `v20.10.0` and `10.2.3`).

## 🎯 Then Install Backend Dependencies

Once Node.js is installed:

```bash
cd backend
npm install
```

## 🔍 Troubleshooting

**"npm is not recognized" after installation:**
- Close and reopen your terminal/IDE
- Restart your computer if needed
- Make sure Node.js was added to PATH during installation

**Still not working?**
- Check if Node.js is in your PATH: `where.exe node`
- Reinstall Node.js and make sure "Add to PATH" is checked

## 📝 What Node.js Includes

- **node** - JavaScript runtime
- **npm** - Package manager (comes with Node.js)
- **npx** - Package runner (comes with Node.js)

Once installed, you'll be able to run all the `npm` commands!




