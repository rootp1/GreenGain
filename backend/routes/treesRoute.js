import express from "express";
import { calculatePlantAge } from "../controller/sequestration.js";
import { uploadtree,gettree} from "../controller/uploadController.js";
const router =express.Router();

//router.get("/treeage",calculatePlantAge);

router.post("/uploadtree",uploadtree);
router.get("/gettree",gettree)

export default router;