# MAJOR PROJECT PLAN: Code Sage Transformation

## Goal
Transform "Code Sage" from a prototype into a scalable, production-grade "Major Project" with a robust Flask backend, modern React frontend, and advanced features like AI and Analytics.

## User Review Required
> [!IMPORTANT]
> **Backend Migration**: The current backend is Node.js/Express. To comply with the "Maintain Python/Flask as the core" constraint, we will **REPLACE** the Node.js backend with a new Flask-based architecture.
> **Database**: We will use **SQLite** for development and **PostgreSQL** for production (via Render/Neon).

## Architecture Upgrade

### 1. Clean Architecture (Flask)
We will structure the Flask backend using Clean Architecture principles to ensure modularity and testability.
- **Controllers (Blueprints)**: Handle HTTP requests and responses.
- **Services**: Business logic layer (AI processing, Analytics calculations).
- **Repositories/Models**: Database interactions (SQLAlchemy).
- **Schemas**: Data validation (Pydantic or Marshmallow).

**New Directory Structure:**
```
backend/
  ├── app/
  │   ├── __init__.py
  │   ├── api/          # Controllers/Routes
  │   │   ├── auth.py
  │   │   ├── chat.py
  │   │   ├── analytics.py
  │   │   └── community.py
  │   ├── core/         # Config, Security
  │   ├── services/     # Business Logic
  │   │   ├── ai_service.py
  │   │   └── analytics_service.py
  │   └── models/       # DB Models
  ├── tests/
  ├── run.py
  └── requirements.txt
```

### 2. Database Schema Upgrade
- **Users**: Extended with Roles (Admin, User, Pro), Preferences.
- **Analytics**: Tables for tracking User Activity, Learning Progress, System Usage.
- **Content**: Lessons, Community Posts, Comments.

### 3. "Wow" Features (Phase 2)
- **Analytics Dashboard**: Real-time visualization of user learning curves and system usage using **Plotly** (backend generation) or **Chart.js** (frontend rendering with API data).
- **AI Integration**: "Code Sage" AI Advisor using **Gemini API**.
    - Features: Code explanation, debugging assistance, learning path recommendations.
- **Advanced UI/UX**:
    - **Dark Mode**: Cinematic/Melancholic aesthetic using TailwindCSS.
    - **Animations**: Framer Motion for smooth transitions.

### 4. University Integration & Fixes (Phase 2.5)
- **User Model Upgrade**: Add `roll_number`, `branch`, `semester`.
- **Firebase Authentication**: Replace mock OTP with Firebase Auth (Email/Password or Phone).
- **Lessons & Shoutouts**:
    -   Implement `/api/lessons` endpoint with seed data.
    -   Implement `/api/feedback` endpoint for shoutouts.
- **Interactive Code Editor (Codespace)**:
    -   Integrate Monaco Editor (VS Code engine).
    -   Use Piston API for multi-language code execution.

## Proposed Changes

### Backend (Python/Flask)
#### [MODIFY] [backend/requirements.txt](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/backend/requirements.txt)
- Add `firebase-admin`.

#### [MODIFY] [backend/app/api/auth.py](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/backend/app/api/auth.py)
- Verify Firebase ID Token instead of mock OTP.

### Frontend (React/Vite)
#### [NEW] [src/lib/firebase.ts](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/src/lib/firebase.ts)
- Initialize Firebase App.

#### [MODIFY] [src/pages/Signup.tsx](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/src/pages/Signup.tsx)
- Use Firebase SDK for signup.

#### [NEW] [src/pages/CodeEditor.tsx](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/src/pages/CodeEditor.tsx)
- Full-screen code editor with language support and execution.

#### [NEW] [backend/app/models/lesson.py](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/backend/app/models/lesson.py)
- Define Lesson model.

#### [NEW] [backend/app/models/feedback.py](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/backend/app/models/feedback.py)
- Define Feedback model (Shoutouts).

#### [NEW] [backend/app/api/lessons.py](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/backend/app/api/lessons.py)
- Endpoints for fetching lessons.

#### [NEW] [backend/app/api/feedback.py](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/backend/app/api/feedback.py)
- Endpoints for fetching/posting shoutouts.

#### [MODIFY] [backend/app/api/auth.py](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/backend/app/api/auth.py)
- Update signup to accept new fields.
- Add `/verify-otp` endpoint.

### Frontend (React/Vite)
#### [MODIFY] [src/pages/Signup.tsx](file:///c:/Users/login/OneDrive/Desktop/Y/Coding/CodeSage-Minor-Project-/src/pages/Signup.tsx)
- Add fields for Roll Number, Branch, Semester.
- Add OTP verification step.

## Verification Plan

### Automated Tests
- **Backend**: `pytest` for unit tests of Services and API endpoints.
- **Frontend**: Browser testing of critical flows (Login -> Dashboard -> AI Chat).

### Manual Verification
- Verify "Dark Mode" aesthetic.
- Test AI responses for accuracy and speed.
- Validate Analytics data accuracy.
