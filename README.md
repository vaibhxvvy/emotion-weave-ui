# Emotic - Turn Emotions into Art

A premium emotion-driven AI art generation platform. Express yourself through text or voice, and watch your feelings transform into stunning visual artwork.

![Emotic Banner](https://via.placeholder.com/1200x400/0C1B1E/116466?text=EMOTIC)

## 🎨 Project Overview

**Emotic** is a full-stack web application that:
- Analyzes emotional content from text or voice input
- Generates unique AI artwork based on detected emotions
- Provides a beautiful, premium user experience inspired by v0.app
- Stores user artwork in a personal library
- Supports both guest mode (try without signup) and authenticated users

**Tech Stack:**
- **Frontend:** React + Vite + TypeScript + TailwindCSS
- **UI Library:** shadcn-ui components
- **Animations:** Framer Motion + GSAP
- **Backend:** Flask (Python) - API server
- **Authentication:** JWT-based (handled by Flask)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ and npm (frontend)
- **Python** 3.8+ and pip (backend)
- **Git** for version control

### Frontend Setup (Lovable)

This project is built with Lovable and is ready to run:

1. **Open in Lovable:** The project is already set up in your Lovable workspace
2. **Preview:** Click the preview window to see your app live
3. **Edit:** Use Lovable's AI to make changes or edit code in Dev Mode

**Running Locally (Optional):**
```bash
# Clone from your GitHub (if connected)
git clone <YOUR_GITHUB_URL>
cd emotic

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

The frontend will run at `http://localhost:5173`

### Backend Setup (Your Flask Backend)

1. **Extract your Flask backend** from the uploaded ZIP file
2. **Install dependencies:**
```bash
cd your-flask-backend
pip install -r requirements.txt
```

3. **Configure environment variables:**
```bash
# Create .env file in Flask backend folder
cp .env.example .env
```

4. **Edit `.env` with your API keys:**
```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=sk-your-openai-key
DATABASE_URL=sqlite:///emotic.db  # or PostgreSQL URL
ALLOWED_ORIGINS=http://localhost:5173,https://your-project.lovable.app
```

5. **Run Flask server:**
```bash
python app.py
# Or with gunicorn
gunicorn app:app --bind 0.0.0.0:5000
```

The backend will run at `http://localhost:5000`

### Testing the Connection

1. Start both frontend (Lovable or `npm run dev`) and backend (`python app.py`)
2. Open `http://localhost:5173` (or Lovable preview)
3. Click **"Try Now"** to enter guest mode
4. Type an emotion in the chat (e.g., "I feel overwhelmed with joy")
5. Check browser console (F12) for API requests
6. Check Flask console for incoming requests

**Expected Flow:**
- User message appears immediately
- Loading animation shows
- Flask backend processes emotion and generates art
- AI response with generated image appears

---

## 🔌 Flask Backend Integration

### Required Flask API Endpoints

Your Flask backend must implement the following REST API endpoints:

#### 1. **Generate Art from Emotion**
```python
POST /api/v1/generate
Content-Type: application/json
Authorization: Bearer <token> (optional for guest mode)

Request Body:
{
  "prompt": "I feel overwhelmed with joy",
  "mode": "text",  # or "voice"
  "emotion": "joy",  # detected emotion
  "user_id": "optional-for-auth"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "image_url": "https://your-cdn.com/generated-art.jpg",
    "emotion": "joy",
    "emotion_intensity": 0.85,
    "prompt": "I feel overwhelmed with joy",
    "created_at": "2025-11-11T10:30:00Z",
    "id": "art_12345"
  }
}

Error Response (400/500):
{
  "success": false,
  "error": "Error message here"
}
```

#### 2. **Get User's Art History**
```python
GET /api/v1/history?limit=20&offset=0
Authorization: Bearer <token>

Response (200 OK):
{
  "success": true,
  "data": {
    "artworks": [
      {
        "id": "art_12345",
        "image_url": "https://...",
        "emotion": "joy",
        "prompt": "...",
        "created_at": "2025-11-11T10:30:00Z"
      }
    ],
    "total": 45,
    "limit": 20,
    "offset": 0
  }
}
```

#### 3. **Get User's Library**
```python
GET /api/v1/library?limit=20&offset=0
Authorization: Bearer <token>

Response: Same as /history
```

#### 4. **User Authentication (Optional)**
```python
POST /api/v1/auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response (200 OK):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

```python
POST /api/v1/auth/signup
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}

Response (201 Created):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## ⚙️ Configuration

### 1. Update API Base URL

The API URL is configured via environment variable. **No need to edit code!**

**Create `.env` file** in your project root:
```env
# Development
VITE_API_URL=http://localhost:5000

# Production (update when deploying)
# VITE_API_URL=https://your-backend.railway.app
```

The app automatically uses this URL from `src/lib/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### 2. CORS Setup (Flask Backend)

Your Flask app MUST enable CORS to allow frontend requests:

```python
# Flask app (app.py)
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Development - Allow all origins
CORS(app)

# Production - Restrict to your frontend domain
# CORS(app, origins=["https://your-emotic-frontend.com"])
```

Install CORS:
```bash
pip install flask-cors
```

### 3. Environment Variables (Backend)

Create a `.env` file in your Flask project:

```env
# .env (Flask backend)
FLASK_ENV=development
SECRET_KEY=your-super-secret-jwt-key
DATABASE_URL=postgresql://user:pass@localhost/emotic
OPENAI_API_KEY=sk-...  # For emotion detection & art generation
AWS_ACCESS_KEY=...  # If using S3 for image storage
AWS_SECRET_KEY=...
```

**IMPORTANT:** Never commit API keys to the repository!

---

## 🧪 Development Workflow

### Running Frontend + Backend Together

**Terminal 1 - Frontend:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - Flask Backend:**
```bash
cd your-flask-backend
python app.py
# Runs on http://localhost:5000
```

### Testing the Connection

1. Start both servers
2. Open `http://localhost:5173` in your browser
3. Click "Try Now" to enter guest mode
4. Type an emotion in the chat
5. Check browser console (F12) for API requests
6. Check Flask console for incoming requests

---

## 📡 API Integration Details

### API Service Layer (`src/lib/api.ts`)

All API calls are centralized in `src/lib/api.ts`. The frontend components automatically use this service.

**Key Functions:**
- `generateArt(prompt, mode, emotion)` - Generate art from emotion
- `getLibrary(limit, offset)` - Fetch user's artwork
- `getHistory(limit, offset)` - Get generation history
- `login(email, password)` - User login
- `signup(name, email, password)` - User registration
- `logout()` - Clear session
- `isAuthenticated()` - Check if user is logged in
- `getCurrentUser()` - Get current user data

### Frontend Components (Already Connected!)

#### 1. **Chat Component** (`src/pages/Chat.tsx`)
✅ **Already connected to Flask backend via `generateArt()` API**

How it works:

```typescript
// User types emotion → handleSend() called
const handleSend = async () => {
  // Add user message to chat
  setMessages((prev) => [...prev, userMessage]);
  
  // Call Flask backend API
  const result = await generateArt({
    prompt: input,
    mode: 'text',
    emotion: 'auto-detect',
  });

  if (result.success && result.data) {
    // Add AI response with generated art
    setMessages((prev) => [...prev, {
      type: 'assistant',
      content: `I've captured your ${result.data.emotion} emotion...`,
      emotion: result.data.emotion,
      imageUrl: result.data.image_url, // From Flask backend
    }]);
  } else {
    // Show error toast
    toast({
      title: "Generation failed",
      description: result.error,
      variant: "destructive",
    });
  }
};
```

**What Flask backend should return:**
```json
{
  "success": true,
  "data": {
    "image_url": "https://your-cdn.com/art.jpg",
    "emotion": "joy",
    "emotion_intensity": 0.85,
    "prompt": "I feel happy",
    "created_at": "2025-11-12T10:30:00Z",
    "id": "art_12345"
  }
}
```

#### 2. **Library Component** (`src/pages/Library.tsx`)
✅ **Already connected to Flask backend via `getLibrary()` API**

How it works:
```typescript
// On page load, fetch user's library
useEffect(() => {
  // Redirect if not authenticated
  if (!isAuthenticated()) {
    navigate('/');
    return;
  }

  // Fetch library from Flask backend
  const result = await getLibrary(50, 0);
  
  if (result.success && result.data) {
    setArtworks(result.data.artworks);
  }
}, []);
```

**What Flask backend should return:**
```json
{
  "success": true,
  "data": {
    "artworks": [
      {
        "id": "art_123",
        "image_url": "https://...",
        "emotion": "joy",
        "prompt": "I feel happy",
        "created_at": "2025-11-12T10:30:00Z"
      }
    ],
    "total": 45,
    "limit": 50,
    "offset": 0
  }
}
```

#### 3. **Auth Modal** (`src/components/AuthModal.tsx`)
✅ **Already connected to Flask backend via `login()` and `signup()` APIs**

How it works:
```typescript
// User submits login form
const handleLogin = async (e) => {
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Call Flask backend
  const result = await login(email, password);
  
  if (result.success) {
    // Auto-stored in sessionStorage by api.ts
    toast({ title: "Login successful" });
    navigate('/chat');
  } else {
    toast({ 
      title: "Login failed", 
      description: result.error,
      variant: "destructive" 
    });
  }
};
```

**What Flask backend should return:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

## 🔐 Authentication Flow

### Guest Mode (No Login)
1. User clicks "Try Now" on landing page
2. Frontend sets `sessionStorage.setItem('emotic_guest', 'true')`
3. User can chat and generate art
4. History is temporary (not saved to backend)
5. User can click "Login" anytime to save their work

### Authenticated Mode
1. User clicks "Login / Sign Up"
2. Modal appears with login/signup forms
3. On success, store JWT token in `sessionStorage`
4. All API requests include `Authorization: Bearer <token>`
5. User's artwork is saved to their account

---

## 🐙 GitHub Integration & Going Live

### Connect Your Project to GitHub

**Benefits:**
- Version control for all code
- Auto-sync between Lovable and GitHub
- Easy collaboration with team
- Required for most hosting platforms
- Backup of all your work

**Steps to Connect:**

1. **In Lovable Editor:** Click **GitHub** button (top right corner)
2. **Authorize:** Connect and authorize Lovable GitHub App
3. **Create Repository:** Select your account/organization
4. **Done!** All changes auto-sync bidirectionally

**After Connection:**
- Every change in Lovable → Auto-pushes to GitHub
- Every push to GitHub → Auto-syncs to Lovable
- View code at: `https://github.com/your-username/your-repo`

### Deploy Your Flask Backend via GitHub

Once your backend code is on GitHub:

**Railway (Recommended):**
1. Go to [railway.app](https://railway.app)
2. **New Project → Deploy from GitHub**
3. Select your Flask backend repository
4. Railway auto-detects Python and installs dependencies
5. Add environment variables in Railway dashboard
6. Deploy! Get URL like `https://your-app.up.railway.app`

**Render:**
1. Go to [render.com](https://render.com)
2. **New → Web Service → Connect Repository**
3. Select your Flask backend repo
4. Configure build/start commands
5. Add environment variables
6. Deploy!

### Make Your Website Live (Complete Flow)

**Step 1: Deploy Backend**
```bash
# Option A: Railway CLI
cd your-flask-backend
railway login
railway init
railway up

# Option B: GitHub + Railway Dashboard
# Push to GitHub → Connect repo in Railway → Deploy
```

**Step 2: Get Backend URL**
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`
- Heroku: `https://your-app.herokuapp.com`

**Step 3: Update Frontend Environment**

In Lovable project root, create/update `.env`:
```env
VITE_API_URL=https://your-app.up.railway.app
```

**Step 4: Deploy Frontend**

In Lovable:
1. Click **Publish** button (top right)
2. First time: Your app gets deployed to `https://your-project.lovable.app`
3. After changes: Click **Update** to push updates live

**Step 5: Test Production**
1. Visit `https://your-project.lovable.app`
2. Click "Try Now" (guest mode)
3. Type an emotion → Check if art generates
4. Test Login/Signup
5. Check Library page (requires login)

### Custom Domain (Optional)

**Requirements:**
- Lovable paid plan ($20/month)
- Own domain from registrar (Namecheap, GoDaddy, etc.)

**Setup:**
1. Lovable: **Project → Settings → Domains**
2. Add your domain (e.g., `emotic.com`)
3. Configure DNS at your registrar:
   ```
   Type: CNAME
   Name: @ (or subdomain like "app")
   Value: your-project.lovable.app
   ```
4. Wait 5-60 minutes for DNS propagation
5. SSL auto-generated by Lovable

**Result:** Access your app at `https://emotic.com` 🎉

---

## 🎨 Flask Backend Example Structure

```
your-flask-backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (DO NOT COMMIT)
├── models/
│   ├── user.py           # User model
│   └── artwork.py        # Artwork model
├── routes/
│   ├── auth.py           # Authentication endpoints
│   ├── generate.py       # Art generation endpoints
│   └── library.py        # Library/history endpoints
├── services/
│   ├── emotion_detector.py  # Emotion analysis
│   └── art_generator.py     # AI art generation
└── utils/
    ├── jwt.py            # JWT token handling
    └── db.py             # Database connection
```

### Minimal Flask Example (`app.py`)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/generate', methods=['POST'])
def generate_art():
    data = request.json
    prompt = data.get('prompt')
    
    # TODO: Implement emotion detection
    # TODO: Call AI art generation API (DALL-E, Stable Diffusion, etc.)
    
    return jsonify({
        'success': True,
        'data': {
            'image_url': 'https://example.com/art.jpg',
            'emotion': 'joy',
            'emotion_intensity': 0.85,
            'prompt': prompt,
            'created_at': '2025-11-11T10:30:00Z',
            'id': 'art_12345'
        }
    })

@app.route('/api/v1/history', methods=['GET'])
def get_history():
    # TODO: Fetch from database
    return jsonify({
        'success': True,
        'data': {
            'artworks': [],
            'total': 0
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

---

## 🚢 Deployment

### Quick Deployment Overview

1. **Deploy Flask Backend** → Get backend URL
2. **Update Frontend `.env`** → Set `VITE_API_URL` to backend URL
3. **Deploy Frontend** → Click Update in Lovable

### Detailed Deployment Guide

👉 **[Complete Deployment Guide](./DEPLOYMENT.md)** - Step-by-step instructions for all platforms

**Quick Links:**
- [Frontend Deployment (Lovable)](./DEPLOYMENT.md#frontend-deployment-lovable)
- [Backend Deployment Options](./DEPLOYMENT.md#backend-deployment-options)
- [Environment Configuration](./DEPLOYMENT.md#environment-configuration)
- [GitHub Integration](./DEPLOYMENT.md#github-integration)
- [Production Checklist](./DEPLOYMENT.md#production-checklist)

### Recommended: Railway (Easiest)

**1. Deploy Flask Backend to Railway:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Navigate to your Flask backend folder
cd your-flask-backend

# Login and deploy
railway login
railway init
railway up

# Set environment variables
railway variables set FLASK_ENV=production
railway variables set SECRET_KEY=your-secret-key
railway variables set OPENAI_API_KEY=sk-...
railway variables set ALLOWED_ORIGINS=https://your-project.lovable.app

# Get your backend URL
railway status
# Example: https://your-app.up.railway.app
```

**2. Update Frontend Environment:**

In Lovable, create/update `.env`:
```env
VITE_API_URL=https://your-app.up.railway.app
```

**3. Deploy Frontend:**

Click **Update** in Lovable's publish dialog.

**Done!** Your app is live at `https://your-project.lovable.app`

---

## 🐛 Troubleshooting

### Issue: CORS Errors
**Solution:** Enable CORS in Flask (see Configuration section)

### Issue: API requests fail
**Solution:** Check that both frontend and backend are running, verify API_BASE_URL

### Issue: Images not loading
**Solution:** Ensure your Flask backend returns valid image URLs accessible to the browser

### Issue: Authentication not working
**Solution:** Check JWT token format, ensure Authorization header is sent with requests

### Issue: "Failed to fetch"
**Solution:** Backend might not be running, check Flask console for errors

---

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React + Vite Guide](https://vitejs.dev/guide/)
- [Lovable Docs](https://docs.lovable.dev/)
- [shadcn-ui Components](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/docs)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is built with [Lovable](https://lovable.dev) and follows their terms of service.

---

## 💬 Support

For questions about:
- **Frontend/Lovable:** [Lovable Discord](https://discord.gg/lovable)
- **Flask Backend:** Check Flask documentation or your backend developer

---

**Built with ❤️ using Lovable**

Project URL: https://lovable.dev/projects/ddde5bb6-2f0d-4504-bc1a-bd4e7907ef5d
