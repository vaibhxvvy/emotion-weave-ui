# 🚀 Emotic Deployment Guide

Complete guide for deploying Emotic to production on various platforms.

---

## 📋 Table of Contents

1. [Frontend Deployment (Lovable)](#frontend-deployment-lovable)
2. [Backend Deployment Options](#backend-deployment-options)
3. [Environment Configuration](#environment-configuration)
4. [GitHub Integration](#github-integration)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Production Checklist](#production-checklist)

---

## 🎨 Frontend Deployment (Lovable)

### Quick Deploy

1. **Click Publish Button** in Lovable editor (top right)
2. Your app will be deployed to: `https://your-project.lovable.app`
3. Every time you click **Update** in the publish dialog, changes go live

### Custom Domain (Requires Paid Plan)

1. Go to **Project → Settings → Domains** in Lovable
2. Click **Add Custom Domain**
3. Enter your domain (e.g., `emotic.com`)
4. Follow DNS configuration instructions:
   - Add CNAME record: `your-project.lovable.app`
   - Or A record if using root domain
5. Wait for DNS propagation (5-60 minutes)

**Important:** Free plan uses `*.lovable.app` subdomain only.

---

## 🔧 Backend Deployment Options

### Option 1: Railway (Recommended - Easiest)

**Why Railway?**
- Free $5 credit/month (no credit card required)
- Auto-deploys from Git
- Built-in environment variables
- PostgreSQL database included

**Steps:**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Navigate to your Flask backend folder
cd path/to/your-flask-backend

# 4. Initialize Railway project
railway init

# 5. Add PostgreSQL database (optional)
railway add

# 6. Deploy
railway up
```

**Set Environment Variables in Railway:**
```bash
railway variables set FLASK_ENV=production
railway variables set SECRET_KEY=your-secret-key-here
railway variables set OPENAI_API_KEY=sk-your-openai-key
railway variables set ALLOWED_ORIGINS=https://your-project.lovable.app
```

**Get Your Backend URL:**
```bash
railway status
# Example output: https://your-app.up.railway.app
```

---

### Option 2: Render

**Why Render?**
- Free tier available
- Auto-deploys from GitHub
- Easy PostgreSQL setup

**Steps:**

1. **Push your Flask backend to GitHub**
2. **Go to [render.com](https://render.com)**
3. **Create New → Web Service**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app` (or `python app.py`)
   - **Plan:** Free
6. **Add Environment Variables:**
   - `FLASK_ENV=production`
   - `SECRET_KEY=your-secret-key`
   - `OPENAI_API_KEY=sk-...`
   - `ALLOWED_ORIGINS=https://your-project.lovable.app`
7. **Deploy**

Your backend will be live at: `https://your-app.onrender.com`

---

### Option 3: Heroku

**Note:** Heroku removed free tier. Requires credit card.

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
cd your-flask-backend
heroku create your-emotic-api

# Add PostgreSQL (optional)
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=your-secret-key
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set ALLOWED_ORIGINS=https://your-project.lovable.app

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

### Option 4: DigitalOcean App Platform

1. **Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)**
2. **Create App → From GitHub**
3. **Select your Flask backend repo**
4. **Configure:**
   - **Resource Type:** Web Service
   - **Environment:** Python
   - **Build Command:** (auto-detected)
   - **Run Command:** `gunicorn app:app --bind 0.0.0.0:$PORT`
5. **Add Environment Variables** (same as above)
6. **Deploy**

Cost: Starting at $5/month

---

## ⚙️ Environment Configuration

### Frontend (.env in Lovable)

Create `.env` in your project root:

```env
# Production Flask Backend URL
VITE_API_URL=https://your-backend.railway.app

# Or Render
# VITE_API_URL=https://your-app.onrender.com

# Or Heroku
# VITE_API_URL=https://your-emotic-api.herokuapp.com
```

**Important:** After updating `.env`, click **Update** in Lovable's publish dialog to deploy changes.

---

### Backend Environment Variables

**Required variables for all platforms:**

```env
# Flask Configuration
FLASK_ENV=production
SECRET_KEY=generate-a-strong-random-key-here
DEBUG=False

# CORS - Allow your Lovable frontend
ALLOWED_ORIGINS=https://your-project.lovable.app

# AI Services
OPENAI_API_KEY=sk-your-openai-api-key-here

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Image Storage (if using AWS S3)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1

# Optional: Email service
SENDGRID_API_KEY=your-sendgrid-key
```

**Generate a strong SECRET_KEY:**
```python
import secrets
print(secrets.token_urlsafe(32))
```

---

## 🐙 GitHub Integration

### Connect Lovable to GitHub

1. **In Lovable Editor:** Click **GitHub** button (top right)
2. **Connect to GitHub** → Authorize Lovable app
3. **Create Repository** → Select account/organization
4. **Repository created!** All changes auto-sync

**Benefits:**
- Every Lovable change pushes to GitHub
- Every GitHub push syncs to Lovable
- Version control for free
- Easy collaboration

---

### Deploy Backend from GitHub

**For Railway, Render, DigitalOcean:**

All support auto-deployment from GitHub:

1. Push your Flask backend to GitHub
2. Connect your hosting platform to GitHub repo
3. Every push to `main` branch auto-deploys
4. Set up environment variables in platform dashboard

---

## 🌐 Custom Domain Setup

### Frontend Custom Domain (Lovable)

**Requirements:**
- Lovable paid plan
- Domain from registrar (Namecheap, GoDaddy, Cloudflare, etc.)

**Steps:**

1. **Lovable:** Project → Settings → Domains → Add Domain
2. **DNS Provider:** Add these records:

**For subdomain (e.g., app.emotic.com):**
```
Type: CNAME
Name: app
Value: your-project.lovable.app
TTL: 300 (or Auto)
```

**For root domain (e.g., emotic.com):**
```
Type: A
Name: @
Value: [IP provided by Lovable]
```

3. **Wait 5-60 minutes** for DNS propagation
4. **SSL Certificate** auto-generated by Lovable

---

### Backend Custom Domain

**Railway:**
- Settings → Domains → Generate Domain or Custom Domain
- Add CNAME: `your-app.up.railway.app`

**Render:**
- Dashboard → Custom Domain → Add Domain
- Add CNAME: `your-app.onrender.com`

**Heroku:**
```bash
heroku domains:add api.emotic.com
# Add CNAME in DNS: xxx.herokudns.com
```

---

## ✅ Production Checklist

### Before Going Live

#### Frontend
- [ ] Environment variable `VITE_API_URL` points to production backend
- [ ] Click **Update** in Lovable publish dialog
- [ ] Test all pages: Landing, Chat, Library
- [ ] Test authentication flow
- [ ] Verify API calls work (check browser console)
- [ ] Test on mobile devices
- [ ] Check SEO: Title, description, meta tags
- [ ] Remove "Edit in Lovable" badge (Settings → Hide Badge)

#### Backend
- [ ] `FLASK_ENV=production` set
- [ ] `DEBUG=False` in production
- [ ] Strong `SECRET_KEY` generated
- [ ] `ALLOWED_ORIGINS` includes frontend URL
- [ ] CORS configured correctly
- [ ] Database migrations applied
- [ ] API keys (OpenAI, AWS, etc.) configured
- [ ] Error logging enabled (Sentry, LogRocket)
- [ ] Rate limiting configured
- [ ] SSL certificate active (HTTPS)
- [ ] Health check endpoint working
- [ ] Test all API endpoints
- [ ] Monitor server logs for errors

#### Security
- [ ] JWT token expiration set (e.g., 7 days)
- [ ] Password hashing enabled (bcrypt)
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (use ORM)
- [ ] XSS protection headers
- [ ] API rate limiting per user/IP
- [ ] HTTPS only (no HTTP allowed)
- [ ] Secrets not committed to Git
- [ ] CORS restricted to your domain only

#### Performance
- [ ] Image optimization (compress, lazy load)
- [ ] CDN for static assets (optional)
- [ ] Database indexes on frequently queried fields
- [ ] Caching for repeated API calls (Redis)
- [ ] Backend response time < 500ms
- [ ] Frontend load time < 3 seconds

---

## 🔍 Testing Production

### Frontend Testing

```bash
# Visit your deployed URL
https://your-project.lovable.app

# Open browser console (F12)
# Check for errors
# Try guest mode: "Try Now" button
# Try authentication: Login/Signup
# Generate art in chat
# View library (requires login)
```

### Backend Testing

```bash
# Test health endpoint
curl https://your-backend.railway.app/health

# Test auth
curl -X POST https://your-backend.railway.app/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Test art generation (replace TOKEN)
curl -X POST https://your-backend.railway.app/api/v1/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"prompt":"I feel happy","mode":"text"}'
```

---

## 🆘 Troubleshooting Production Issues

### Issue: API requests fail (CORS error)

**Solution:**
```python
# Flask backend
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "https://your-project.lovable.app",
    "http://localhost:5173"  # Development only
])
```

### Issue: Environment variables not loading

**Railway:**
```bash
railway variables
railway variables set KEY=value
railway restart
```

**Render:**
- Dashboard → Environment → Add Variable → Save Changes
- Render auto-redeploys

### Issue: 502 Bad Gateway

**Causes:**
- Backend not running
- Wrong port binding
- Crashed server

**Solution:**
```python
# Make sure Flask binds to 0.0.0.0 and uses PORT env
import os
port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port)
```

### Issue: Database connection fails

**Check:**
- `DATABASE_URL` env variable set correctly
- Database service running
- Firewall allows connections
- SSL mode configured (for cloud databases)

---

## 📊 Monitoring & Analytics

### Error Tracking

**Sentry (Free tier available):**
```bash
pip install sentry-sdk[flask]
```

```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FlaskIntegration()],
    environment="production"
)
```

### Analytics

**Google Analytics:**
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 💰 Cost Estimation

### Free Tier (Getting Started)
- **Frontend (Lovable):** Free forever with `*.lovable.app` domain
- **Backend (Railway):** $5 free credit/month
- **Backend (Render):** Free tier (with limitations)
- **Database (Render/Railway):** Included in free tier
- **Total:** $0/month for small projects

### Production Tier (Recommended)
- **Frontend (Lovable Pro):** $20/month (custom domain, more credits)
- **Backend (Railway/Render):** $7-10/month
- **Database (PostgreSQL):** Included
- **Total:** ~$30/month

### Scale Tier (High Traffic)
- **Frontend (Lovable):** $20/month
- **Backend (DigitalOcean/AWS):** $20-50/month
- **Database (Managed):** $15-30/month
- **CDN (Cloudflare):** Free or $20/month
- **Total:** $50-120/month

---

## 📚 Additional Resources

- [Lovable Docs](https://docs.lovable.dev)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Flask Deployment Guide](https://flask.palletsprojects.com/en/latest/deploying/)
- [Gunicorn Configuration](https://docs.gunicorn.org/en/stable/configure.html)

---

**🎉 Congratulations!** Your Emotic app is now live in production.

For support, contact:
- Frontend/Lovable: [Lovable Discord](https://discord.gg/lovable)
- Backend: Check your hosting platform's documentation

---

**Built with ❤️ using Lovable**
