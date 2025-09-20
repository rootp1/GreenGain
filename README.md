# GreenGain

A comprehensive tree planting and carbon sequestration tracking application.

## Environment Configuration

This project uses environment variables to manage configuration across different environments. Follow these steps to set up your environment:

### Quick Setup

1. **Copy environment example files:**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Frontend
   cp next/.env.example next/.env.local
   
   # ML Model
   cp ml_model/.env.example ml_model/.env
   ```

2. **Fill in your actual values** in each `.env` file according to your setup.

### Environment Files Structure

#### Backend (`/backend/.env`)
- **NODE_ENV**: Development or production mode
- **PORT**: Server port (default: 4000)
- **HOST**: Server host (default: localhost)
- **CORS_ORIGINS**: Allowed origins including `https://greengain.onrender.com`
- **SESSION_SECRET**: Secret key for session management
- **SUPABASE_URL**: Your Supabase project URL
- **SUPABASE_KEY**: Your Supabase anonymous key
- **IMGBB_API_KEY**: API key for image hosting
- **GEMINI_API_KEY**: Google Gemini AI API key
- **ML_MODEL_URL**: ML model service URL

#### Frontend (`/next/.env.local`)
- **NEXT_PUBLIC_BACKEND_URL**: Backend API URL
- **NEXT_PUBLIC_ML_MODEL_URL**: ML model service URL
- **NEXT_PUBLIC_APP_NAME**: Application name
- **NEXT_PUBLIC_NODE_ENV**: Environment mode

#### ML Model (`/ml_model/.env`)
- **FLASK_HOST**: Flask server host
- **FLASK_PORT**: Flask server port (default: 5000)
- **FLASK_DEBUG**: Debug mode (True/False)
- **CORS_ORIGINS**: Allowed origins including `https://greengain.onrender.com`

### Production URLs

The application is configured to work with:
- **Production Frontend**: `https://greengain.onrender.com`
- **Local Development**: `http://localhost:3000`

### Security Notes

- Never commit actual `.env` files to version control
- Use strong, unique values for `SESSION_SECRET` in production
- Rotate API keys regularly
- Use different database credentials for production

### Development Setup

1. **Install dependencies:**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd next && npm install
   
   # ML Model
   cd ml_model && pip install -r requirements.txt
   ```

2. **Start development servers:**
   ```bash
   # Backend (Terminal 1)
   cd backend && npm start
   
   # Frontend (Terminal 2)
   cd next && npm run dev
   
   # ML Model (Terminal 3)
   cd ml_model && python app.py
   ```

### Production Deployment

#### Render Deployment (Backend)

1. **Environment Variables on Render:**
   Set these environment variables in your Render dashboard:
   ```
   NODE_ENV=production
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   IMGBB_API_KEY=your_imgbb_api_key
   GEMINI_API_KEY=your_gemini_api_key
   SESSION_SECRET=your_secure_session_secret
   CORS_ORIGINS=https://greengain.onrender.com
   ```

2. **Build Command:** `npm install`
3. **Start Command:** `npm start`
4. **Port Binding:** The app automatically binds to `0.0.0.0` in production mode

For production deployment, use the `.env.production` files and ensure all production URLs and credentials are properly configured.

## Architecture

- **Backend**: Node.js/Express API server
- **Frontend**: Next.js React application
- **ML Model**: Flask-based tree species prediction service
- **Database**: Supabase (PostgreSQL)
- **Image Storage**: ImgBB API
- **AI Integration**: Google Gemini API
