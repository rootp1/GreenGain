import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./utils/passport.js";
import dotenv from 'dotenv';
dotenv.config();

import authRoute from "./routes/authRoute.js";
import treeRoute from "./routes/treesRoute.js";
import imageRoute from "./routes/imageRoute.js";

const app = express();

// ✅ Accept JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Configure CORS and session
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(/[,\s]+/);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('CORS blocked for origin ' + origin));
  },
  credentials: true
}));

// ✅ Secure session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
  })
);

// ✅ Passport session setup
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoute);
app.use("/tree", treeRoute);
app.use("/upload", imageRoute);

// ✅ Start server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
