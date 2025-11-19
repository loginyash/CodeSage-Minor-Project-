# ⚡ Quick Start Guide

## What You Have Now

✅ **Complete Backend** in `/backend` folder
- Express.js API server
- TypeScript
- JSON database
- 3 API endpoints ready to use

✅ **Updated Frontend** 
- API integration
- Loading states
- Error handling
- Feedback form

## 🎯 To Run Everything

### Option 1: Two Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```
✅ Backend running on http://localhost:4000

**Terminal 2 - Frontend:**
```bash
npm install
npm run dev
```
✅ Frontend running on http://localhost:8080

### Option 2: Check What's Already There

All the code is already written! You just need to:

1. **Install dependencies** (if not done yet)
2. **Start both servers**
3. **Open browser** to http://localhost:8080

## 📂 What's in `/backend`?

```
backend/
├── src/
│   ├── app.ts              ← Express setup
│   ├── server.ts           ← Starts server on port 4000
│   ├── routes/             ← API endpoints
│   ├── controllers/        ← Business logic
│   ├── models/             ← TypeScript types
│   ├── db/                 ← JSON file handler
│   └── middleware/          ← Error handling
├── db/
│   └── data.json           ← Your data storage
└── package.json            ← Dependencies
```

## 🔌 API Endpoints

| Method | Endpoint | What It Does |
|--------|----------|--------------|
| GET | `/api/lessons` | Get all lessons |
| GET | `/api/feedback` | Get all feedback |
| POST | `/api/feedback` | Save new feedback |

## 🐛 Common Issues

**"Cannot find module"**
→ Run `npm install` in the backend folder

**"Port 4000 already in use"**
→ Change port in `backend/src/server.ts` line 3

**Frontend can't connect**
→ Make sure backend is running first!

**"npm is not recognized"**
→ Install Node.js from nodejs.org

## 💡 Pro Tips

- Backend data is saved in `backend/db/data.json` - you can edit it directly!
- Check browser console (F12) to see API calls
- Backend logs appear in Terminal 1
- Frontend logs appear in Terminal 2

## ✅ Success Checklist

- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend running (`cd backend && npm run dev`)
- [ ] Frontend running (`npm run dev`)
- [ ] Can see lessons on homepage
- [ ] Can submit feedback form

---

**Still stuck?** Check `SETUP.md` for detailed instructions!




