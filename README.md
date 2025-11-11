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

### Frontend Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run at `http://localhost:5173`

### Backend Setup (Flask)

See the **Flask Backend Integration** section below for detailed instructions.

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

Edit `src/pages/Chat.tsx` to point to your Flask backend:

```typescript
// Find this line (around line 30-35)
const API_BASE_URL = 'http://localhost:5000'; // Change to your Flask server URL

// For production
const API_BASE_URL = 'https://your-flask-api.com';
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

### Frontend Files to Customize

#### 1. **Chat Component** (`src/pages/Chat.tsx`)
This is where API calls are made. Update these sections:

```typescript
// Line ~30: Set your API URL
const API_BASE_URL = 'http://localhost:5000';

// Line ~50-80: handleSubmit function
// This sends the emotion prompt to Flask
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim()) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('emotic_token') || ''}`,
      },
      body: JSON.stringify({
        prompt: input,
        mode: 'text',
        emotion: 'auto-detect',
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      // Handle successful art generation
      setMessages([...messages, {
        id: Date.now(),
        text: input,
        sender: 'user',
      }, {
        id: Date.now() + 1,
        text: `Generated art for emotion: ${data.data.emotion}`,
        sender: 'ai',
        imageUrl: data.data.image_url,
      }]);
    }
  } catch (error) {
    console.error('API Error:', error);
    // Show error toast to user
  }
};
```

#### 2. **Library Component** (`src/pages/Library.tsx`)
Fetch and display user's artwork:

```typescript
// Add useEffect to load library
useEffect(() => {
  const loadLibrary = async () => {
    const token = sessionStorage.getItem('emotic_token');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/library`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setArtworks(data.data.artworks);
    } catch (error) {
      console.error('Failed to load library:', error);
    }
  };

  loadLibrary();
}, []);
```

#### 3. **Auth Modal** (`src/components/AuthModal.tsx`)
Handle login/signup:

```typescript
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      sessionStorage.setItem('emotic_token', data.token);
      sessionStorage.setItem('emotic_user', JSON.stringify(data.user));
      // Redirect to /chat
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
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

### Frontend Deployment (Lovable)

1. Click **Publish** button in Lovable
2. Your frontend is deployed to `https://your-project.lovable.app`
3. Update API_BASE_URL to your production Flask URL

### Backend Deployment Options

**Option 1: Railway**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

**Option 2: Heroku**
```bash
heroku create your-emotic-api
git push heroku main
```

**Option 3: DigitalOcean App Platform**
- Connect your Git repository
- Select Python as runtime
- Deploy automatically

**Option 4: AWS EC2 + Nginx**
- Traditional server setup with full control

### Production Environment Variables

After deploying Flask backend, set these environment variables:

```bash
# Railway/Heroku/DO
FLASK_ENV=production
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
ALLOWED_ORIGINS=https://your-project.lovable.app
```

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
