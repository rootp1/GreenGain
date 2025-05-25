import express from "express";
const router =express.Router();
import { uploadimage } from "../controller/imagetourl.js";

router.post("/", uploadimage); 

export default router;