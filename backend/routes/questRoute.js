import express from "express";
import { getQuests, claimQuest } from "../controller/questController.js";
import passport from "../utils/passport.js";
const router = express.Router();
router.get("/", passport.authenticate("session"), getQuests);
router.post("/claim", passport.authenticate("session"), claimQuest);
export default router;
