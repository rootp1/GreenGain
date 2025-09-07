import express from "express";
import { uploadtree, gettree } from "../controller/uploadController.js";
import { validateTreeInput } from "../middleware/validation.js";
const router = express.Router();
const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};
router.post("/", validateTreeInput, requireAuth, uploadtree);
router.get("/gettree", requireAuth, gettree);
export default router;
