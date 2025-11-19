# 🔐 Authentication & Profile Features

## ✨ What's Been Added

### 1. **Login Page** (`/login`)
- Email and password authentication
- Form validation
- Error handling
- Link to signup page

### 2. **Signup Page** (`/signup`)
- User registration
- Password confirmation
- Email validation
- Link to login page

### 3. **Profile Page** (`/profile`)
- View and edit profile information
- Avatar with initials
- Bio and location fields
- Learning statistics
- Logout functionality

### 4. **Authentication Context**
- Global auth state management
- User session persistence (localStorage)
- Login/logout functions
- Profile update functionality

### 5. **Enhanced Navigation**
- Shows "Sign In" / "Sign Up" when logged out
- Shows user avatar dropdown when logged in
- Quick access to profile and progress
- Logout option

### 6. **Backend API Endpoints**
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Authenticate user
- `PUT /api/auth/profile/:id` - Update profile
- `GET /api/auth/profile/:id` - Get user profile

## 🎯 How to Use

### Sign Up
1. Click "Sign Up" in navigation
2. Fill in name, email, and password
3. Confirm password
4. Click "Create Account"
5. You'll be automatically logged in

### Sign In
1. Click "Sign In" in navigation
2. Enter your email and password
3. Click "Sign In"
4. You'll be redirected to homepage

### View/Edit Profile
1. Click your avatar in navigation
2. Select "Profile"
3. Click "Edit Profile" to make changes
4. Update name, email, location, or bio
5. Click "Save Changes"

### Logout
1. Click your avatar in navigation
2. Select "Log out"
3. You'll be logged out and redirected

## 📁 New Files

**Frontend:**
- `src/contexts/AuthContext.tsx` - Auth state management
- `src/pages/Login.tsx` - Login page
- `src/pages/Signup.tsx` - Signup page
- `src/pages/Profile.tsx` - Profile page

**Backend:**
- `backend/src/models/user.ts` - User model
- `backend/src/controllers/authController.ts` - Auth controllers
- `backend/src/routes/authRoutes.ts` - Auth routes

## 🔒 Security Notes

**Current Implementation (Development):**
- Passwords stored in plain text (localStorage)
- No password hashing
- No JWT tokens
- Simple email/password matching

**For Production, You Should:**
- Hash passwords with bcrypt
- Use JWT tokens for sessions
- Add password reset functionality
- Add email verification
- Implement rate limiting
- Add CSRF protection

## 💾 Data Storage

- **Frontend:** User data stored in localStorage
- **Backend:** User data stored in `backend/db/data.json`
- **Users array:** All registered users in JSON file

## 🎨 UI Features

- ✅ Beautiful login/signup forms
- ✅ Profile page with avatar
- ✅ Dropdown menu in navigation
- ✅ Form validation
- ✅ Error messages
- ✅ Loading states
- ✅ Success notifications

## 🚀 Try It Out!

1. **Sign up** - Create a new account
2. **Check profile** - See your profile page
3. **Edit profile** - Update your information
4. **Logout** - Sign out and sign back in
5. **View stats** - See your learning statistics

Your authentication system is now fully functional! 🎉



