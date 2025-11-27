# 🎓 CodeSage - Interactive Coding Learning Platform

![CodeSage](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

**CodeSage** is a modern, interactive learning platform designed to help beginners and intermediate programmers master coding through an engaging and supportive environment. The platform combines structured learning paths, video tutorials, community interaction, and an AI-powered chatbot assistant to provide a comprehensive learning experience.

### Key Highlights

- **Interactive Learning Paths**: Structured courses covering various programming topics
- **AI-Powered Assistant**: CodeSage Bot powered by Google's Gemini AI for instant help
- **Community Features**: Connect with fellow learners, share knowledge, and grow together
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Daily Coding Tips**: Get motivated with daily programming insights
- **Video Tutorials**: Learn through curated video content
- **Responsive Design**: Beautiful UI built with Tailwind CSS and Shadcn/UI

## ✨ Features

### Frontend Features

- 🎨 **Modern UI/UX**: Built with React, TypeScript, and Shadcn/UI components
- 🌙 **Dark Mode Support**: Toggle between light and dark themes
- 📱 **Fully Responsive**: Optimized for all device sizes
- 🎬 **Smooth Animations**: Powered by Framer Motion
- 🔐 **Authentication System**: Secure login and signup
- 👤 **User Profiles**: Personalized user dashboard
- 📊 **Progress Tracking**: Visual representation of learning progress
- 🤖 **AI Chatbot**: Interactive CodeSage Bot for instant assistance
- 💬 **Community Forum**: Share ideas and collaborate with other learners
- 📚 **Learning Paths**: Curated programming courses and tutorials
- 🎥 **Video Tutorials**: Integrated video learning content

### Backend Features

- 🚀 **RESTful API**: Built with Express.js and TypeScript
- 🤖 **Gemini AI Integration**: Powered by Google's Generative AI
- 🗄️ **Data Management**: Structured data models for lessons, users, and community
- 🔒 **CORS Enabled**: Secure cross-origin resource sharing
- 📝 **Community API**: Post creation, likes, and comments
- 💬 **Chat API**: AI-powered conversation endpoints
- 📖 **Lessons API**: Retrieve structured learning content

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Library |
| **TypeScript** | 5.8.3 | Type Safety |
| **Vite** | 5.4.19 | Build Tool |
| **React Router** | 6.30.1 | Routing |
| **TanStack Query** | 5.83.0 | Data Fetching |
| **Tailwind CSS** | 3.4.17 | Styling |
| **Shadcn/UI** | Latest | Component Library |
| **Framer Motion** | 12.23.24 | Animations |
| **Radix UI** | Latest | Accessible Components |
| **React Hook Form** | 7.61.1 | Form Management |
| **Zod** | 3.25.76 | Schema Validation |
| **Lucide React** | 0.462.0 | Icons |
| **Recharts** | 2.15.4 | Data Visualization |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime Environment |
| **Express.js** | 4.19.2 | Web Framework |
| **TypeScript** | 5.4.0 | Type Safety |
| **Google Generative AI** | 0.24.1 | AI Integration |
| **CORS** | 2.8.5 | Cross-Origin Support |
| **Dotenv** | 17.2.3 | Environment Variables |
| **UUID** | 13.0.0 | Unique Identifiers |

### Development Tools

- **ESLint**: Code linting
- **ts-node-dev**: Development server with hot reload
- **Autoprefixer**: CSS vendor prefixing
- **PostCSS**: CSS processing

## 📁 Project Structure

```
CodeSage-Minor-Project/
├── backend/                    # Backend server
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── models/            # Data models
│   │   ├── middleware/        # Custom middleware
│   │   ├── db/                # Database utilities
│   │   ├── app.ts             # Express app configuration
│   │   └── server.ts          # Server entry point
│   ├── dist/                  # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
├── src/                        # Frontend source
│   ├── api/                   # API client functions
│   ├── components/            # React components
│   ├── pages/                 # Page components
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom hooks
│   ├── types/                 # TypeScript types
│   ├── lib/                   # Utility libraries
│   ├── utils/                 # Helper functions
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
│
├── public/                     # Static assets
├── dist/                       # Production build
├── node_modules/              # Dependencies
├── .gitignore                 # Git ignore rules
├── package.json               # Frontend dependencies
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── components.json            # Shadcn/UI configuration
├── vercel.json                # Vercel deployment config
├── render.yaml                # Render deployment config
└── README.md                  # Project documentation
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Google Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/CodeSage-Minor-Project.git
cd CodeSage-Minor-Project
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

## ⚙️ Configuration

### Backend Configuration

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Edit `.env` and add your configuration:
```env
GOOGLE_API_KEY=your_actual_gemini_api_key_here
PORT=3000
```

> **Note**: Replace `your_actual_gemini_api_key_here` with your actual Google Gemini API key.

### Frontend Configuration (Optional)

If you need to configure the API endpoint, update the base URL in the API client files located in `src/api/`.

## 🎮 Running the Application

### Development Mode

#### Option 1: Run Both Frontend and Backend Simultaneously

**On Windows (PowerShell):**
```powershell
# Run backend
cd backend
npm run dev

# In a new terminal, run frontend
npm run dev
```

**Using Scripts (Windows):**
```bash
.\start-frontend.bat
# or
.\start-frontend.ps1
```

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Production Build

#### Build Frontend:
```bash
npm run build
```

#### Build Backend:
```bash
cd backend
npm run build
```

#### Run Production:
```bash
# Backend
cd backend
npm start

# Frontend (using preview)
npm run preview
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

The project includes a `vercel.json` configuration file for easy deployment to Vercel.

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Backend Deployment (Render)

The project includes a `render.yaml` configuration file for Render deployment.

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Render will automatically detect the `render.yaml` file
4. Set environment variables in the Render dashboard:
   - `GOOGLE_API_KEY`
   - `PORT` (usually 3000)

### Environment Variables for Production

Make sure to set the following environment variables in your deployment platform:

**Backend:**
- `GOOGLE_API_KEY`: Your Google Gemini API key
- `PORT`: Port number (default: 3000)
- `NODE_ENV`: Set to `production`

**Frontend:**
- `VITE_API_URL`: Your backend API URL (if different from default)

## 📚 API Documentation

### Base URL
```
Development: http://localhost:3000/api
Production: https://your-backend-url.com/api
```

### Endpoints

#### Community Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/community/posts` | Get all community posts |
| POST | `/api/community/posts` | Create a new post |
| POST | `/api/community/posts/:id/like` | Like a post |
| POST | `/api/community/posts/:id/comment` | Comment on a post |

#### Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/message` | Send a message to CodeSage Bot |

#### Lessons Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lessons` | Get all available lessons |
| GET | `/api/lessons/:id` | Get a specific lesson |

### Example API Request

```javascript
// Send a message to CodeSage Bot
const response = await fetch('http://localhost:3000/api/chat/message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'What is a function in JavaScript?',
    conversationId: 'unique-conversation-id'
  })
});

const data = await response.json();
console.log(data.response);
```

## 🎯 Features Breakdown

### 1. Learning Paths
- Pre-structured courses covering HTML, CSS, JavaScript, React, and more
- Step-by-step progression with clear objectives
- Estimated completion times for each path

### 2. CodeSage Bot (AI Assistant)
- Powered by Google's Gemini AI
- Context-aware responses
- Helps with coding questions, debugging, and learning concepts
- Maintains conversation history

### 3. Community Platform
- Create and share posts
- Like and comment on posts
- Connect with fellow learners
- Share learning experiences and tips

### 4. Progress Tracking
- Visual dashboard showing learning progress
- Track completed lessons and courses
- Achievement system (if implemented)

### 5. Daily Tips
- Motivational coding tips displayed daily
- Helps maintain learning momentum

### 6. Video Tutorials
- Curated video content
- Covers various programming topics
- Integrated player experience

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request

### Coding Standards

- Follow TypeScript best practices
- Use ESLint for code linting
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design for new components

## 🐛 Known Issues & Troubleshooting

### Port Already in Use
If you get a "port already in use" error, either:
- Kill the process using that port
- Change the port in the `.env` file (backend) or Vite config (frontend)

### API Key Issues
If you're getting authentication errors:
- Verify your Google Gemini API key is correct
- Check if the API key is properly set in the `.env` file
- Ensure there are no spaces or quotes around the API key

### Build Errors
If you encounter build errors:
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work and development

## 🙏 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful component library
- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- All contributors and supporters of this project

## 📞 Contact

For questions, suggestions, or support, please:
- Open an issue on GitHub
- Contact: your.email@example.com

---

<div align="center">

**Made with ❤️ for aspiring programmers**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/CodeSage-Minor-Project?style=social)](https://github.com/yourusername/CodeSage-Minor-Project)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/CodeSage-Minor-Project?style=social)](https://github.com/yourusername/CodeSage-Minor-Project/fork)

</div>
