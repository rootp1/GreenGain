import express from "express";
const router =express.Router();
import { uploadimage } from "../controller/imagetourl.js";

router.post("/uploadimage",uploadimage);

export default router;