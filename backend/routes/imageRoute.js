import express from "express";
import { uploadimage } from "../controller/imagetourl.js";
const router = express.Router();
const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};
router.post("/", requireAuth, uploadimage); 
export default router;