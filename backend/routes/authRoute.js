import express from "express";
import { signup, login, logout, checkauth, updateProfile } from "../controller/authController.js";
import { 
  authRateLimit, 
  validateSignupInput, 
  validateLoginInput, 
  validateProfileUpdate 
} from "../middleware/validation.js";
const router = express.Router();
router.use(authRateLimit);
router.post("/signup", validateSignupInput, signup);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);
router.get("/checkauth", checkauth);
router.post("/update", validateProfileUpdate, updateProfile);
export default router;