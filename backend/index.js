import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import passport from "./utils/passport.js";
import dotenv from 'dotenv';
import { generalRateLimit } from './middleware/validation.js';
dotenv.config();
import authRoute from "./routes/authRoute.js";
import treeRoute from "./routes/treesRoute.js";
import imageRoute from "./routes/imageRoute.js";
const app = express();
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
app.use(generalRateLimit);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(/[,\s]+/);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked for origin ' + origin));
  },
  credentials: true
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);
app.use("/tree", treeRoute);
app.use("/upload", imageRoute);
app.listen(process.env.PORT || 4000, process.env.HOST || 'localhost', () => {
  console.log(`Server running on http://${process.env.HOST || 'localhost'}:${process.env.PORT || 4000}`);
});
