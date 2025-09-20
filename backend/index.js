import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import passport from "./utils/passport.js";
import dotenv from 'dotenv';
import { generalRateLimit } from './middleware/validation.js';

// Load environment variables
dotenv.config();

console.log('Starting server with environment:', process.env.NODE_ENV || 'development');
console.log('PORT from env:', process.env.PORT);
console.log('HOST from env:', process.env.HOST);
console.log('CORS_ORIGINS:', process.env.CORS_ORIGINS);

import authRoute from "./routes/authRoute.js";
import treeRoute from "./routes/treesRoute.js";
import imageRoute from "./routes/imageRoute.js";


const app = express();

// Trust proxy settings for production deployment
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
} else {
  app.set('trust proxy', 1);
}

// Helmet security (CSP relaxed for dev)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "http://localhost:*", "https://*"]
    }
  }
}));

// Rate limiting
app.use(generalRateLimit);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ CORS setup
// Split allowed origins by comma/space, remove trailing slashes, and filter out empties
const allowedOrigins = (process.env.CORS_ORIGINS || 'https://green-gain.vercel.app,http://localhost:3000')
  .split(/[,\s]+/)
  .map(o => o.replace(/\/$/, ''))
  .filter(o => o.length > 0);

console.log("Allowed CORS origins:", allowedOrigins);

app.use(cors({
  origin: (origin, cb) => {
    console.log('CORS check for origin:', origin);
    if (!origin) return cb(null, true); // allow non-browser requests (e.g., Postman, curl)
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      console.log('✅ CORS allowed for:', normalizedOrigin);
      return cb(null, true);
    }
    console.warn("❌ CORS blocked:", origin);
    return cb(new Error('CORS blocked for origin ' + origin));
  },
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Session configuration for cross-origin
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "fallback_secret_change_in_production",
  resave: false,
  saveUninitialized: false,
  name: 'greengain.sid',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
  }
};

// Production-specific session settings
if (process.env.NODE_ENV === 'production') {
  sessionConfig.cookie.secure = true; // Require HTTPS
  sessionConfig.cookie.sameSite = 'none'; // Allow cross-origin
  sessionConfig.proxy = true; // Trust proxy headers
} else {
  sessionConfig.cookie.secure = false;
  sessionConfig.cookie.sameSite = 'lax';
}

console.log('Session config:', {
  secure: sessionConfig.cookie.secure,
  sameSite: sessionConfig.cookie.sameSite,
  name: sessionConfig.name
});

app.use(session(sessionConfig));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Debug middleware to log session info
app.use((req, res, next) => {
  if (req.url.includes('/upload') || req.url.includes('/auth')) {
    console.log('Session Debug:', {
      url: req.url,
      method: req.method,
      sessionID: req.sessionID,
      isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
      hasUser: !!req.user,
      userId: req.user?.id,
      cookies: req.headers.cookie ? 'present' : 'missing',
      origin: req.headers.origin
    });
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint to check session without auth requirement
app.get('/test-session', (req, res) => {
  res.status(200).json({
    sessionID: req.sessionID,
    isAuthenticated: req.isAuthenticated ? req.isAuthenticated() : false,
    hasUser: !!req.user,
    userId: req.user?.id,
    cookies: req.headers.cookie ? 'present' : 'missing'
  });
});

// Routes
app.use("/auth", authRoute);
app.use("/tree", treeRoute);
app.use("/upload", imageRoute);

// Start server
const PORT = process.env.PORT || 4000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : (process.env.HOST || 'localhost');

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
