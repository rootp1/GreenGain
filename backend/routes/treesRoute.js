import express from "express";
import { uploadtree, gettree } from "../controller/uploadController.js";
import passport from "../utils/passport.js";

const router = express.Router();

// ✅ Protect routes with session-based auth
router.post("/uploadtree", uploadtree);
router.get("/gettree", passport.authenticate("session"), gettree);

export default router;
