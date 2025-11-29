# Code Sage: The Major Project

![Code Sage Banner](https://via.placeholder.com/1200x400?text=Code+Sage+Major+Project)

> **Status**: Active Development 🚀
> **Version**: 2.0.0 (Major Project Upgrade)

Code Sage is a production-grade educational platform designed to help users master coding through interactive learning paths, community engagement, and AI-powered assistance.

## 🌟 Key Features

### 1. 🧠 AI-Powered Tutor
Integrated with **Google Gemini Pro**, Code Sage provides real-time code explanations, debugging assistance, and personalized learning tips.

### 2. 📊 Analytics Dashboard
Visualize your learning progress with our "Cinematic" dashboard, featuring:
- Learning Activity Charts
- Daily Usage Stats
- System Health Monitoring

### 3. 🎨 Cinematic UI/UX
A completely redesigned "Melancholic/Cyberpunk" aesthetic using **TailwindCSS** and **Framer Motion**, offering a premium dark mode experience.

### 4. 🛡️ Robust Architecture
- **Backend**: Python/Flask (Clean Architecture)
- **Frontend**: React + Vite + TypeScript
- **Database**: SQLite (Dev) / PostgreSQL (Prod)
- **Containerization**: Docker support

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Flask, SQLAlchemy, Marshmallow, Google Generative AI.
- **DevOps**: Docker, GitHub Actions (Planned).

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-sage.git
   cd code-sage
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python run.py
   ```

3. **Frontend Setup**
   ```bash
   # In a new terminal
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Create a `.env` file in `backend/` with:
   ```env
   FLASK_APP=run.py
   FLASK_ENV=development
   SECRET_KEY=your-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   ```

## 📸 Screenshots

*(Screenshots to be added after final verification)*

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
