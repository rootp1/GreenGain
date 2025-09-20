import express from "express";
import { uploadimage } from "../controller/imagetourl.js";
const router = express.Router();
const requireAuth = (req, res, next) => {
  console.log('Image upload auth check:', {
    isAuthenticated: req.isAuthenticated(),
    hasUser: !!req.user,
    sessionID: req.sessionID,
    userAgent: req.get('User-Agent')?.substring(0, 50)
  });
  
  if (!req.isAuthenticated() || !req.user) {
    console.log('Image upload authentication failed');
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};
router.post("/", requireAuth, uploadimage); 
export default router;