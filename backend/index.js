import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./utils/passport.js";

import authRoute from "./routes/authRoute.js";
import treeRoute from "./routes/treesRoute.js";
import imageRoute from "./routes/imageRoute.js";

const app = express();

// ✅ Accept JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Configure CORS and session
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// ✅ Basic dev memory session store
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,      // true in production with HTTPS
      httpOnly: true,
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
