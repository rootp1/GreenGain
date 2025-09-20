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
app.set('trust proxy', 1);

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
const allowedOrigins = (process.env.CORS_ORIGINS || 'https://green-gain.vercel.app')
  .split(/[,\s]+/)
  .map(o => o.replace(/\/$/, ''))
  .filter(o => o.length > 0);

console.log("Allowed CORS origins:", allowedOrigins);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow non-browser requests (e.g., Postman, curl)
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) {
      return cb(null, true);
    }
    console.warn("❌ CORS blocked:", origin);
    return cb(new Error('CORS blocked for origin ' + origin));
  },
  credentials: true
}));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
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
