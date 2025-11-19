# Backend API Server

This is the Express.js backend server for the Learn Code Cheer application.

## 📁 Folder Structure

```
backend/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server entry point
│   ├── routes/             # API route definitions
│   │   ├── lessonsRoutes.ts
│   │   └── feedbackRoutes.ts
│   ├── controllers/        # Request handlers
│   │   ├── lessonsController.ts
│   │   └── feedbackController.ts
│   ├── models/             # TypeScript interfaces
│   │   ├── lesson.ts
│   │   ├── feedback.ts
│   │   └── dataStore.ts
│   ├── db/                 # Database utilities
│   │   └── jsonDatabase.ts
│   └── middleware/         # Express middleware
│       ├── errorHandler.ts
│       └── notFound.ts
├── db/
│   └── data.json           # JSON file database
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The server will start on **http://localhost:4000**

### 3. Build for Production

```bash
npm run build
npm start
```

## 📡 API Endpoints

### GET /api/lessons
Returns a list of all lessons.

**Response:**
```json
[
  {
    "id": "lesson-1",
    "title": "Intro to HTML",
    "description": "Learn the building blocks of the web.",
    "level": "beginner"
  }
]
```

### GET /api/feedback
Returns all stored feedback entries.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great course!",
    "createdAt": "2025-01-17T12:00:00.000Z"
  }
]
```

### POST /api/feedback
Creates a new feedback entry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great course!"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great course!",
  "createdAt": "2025-01-17T12:00:00.000Z"
}
```

## 🗄️ Database

The backend uses a simple JSON file database located at `backend/db/data.json`. All data is persisted to this file.

## 🔧 Configuration

- **Port**: Default is `4000`. Set `PORT` environment variable to change.
- **CORS**: Enabled for all origins (development only).

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled production build




