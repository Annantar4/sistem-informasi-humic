import { getHome, createHomeContent, getContentById } from "../controller/homeController.js";
import { upload } from "../middleware/uploadImages.js";
import express from "express";

const router = express.Router();

router.get('/home', getHome);
router.post('/home', upload.single('imagePath'),createHomeContent);
router.get('/home/:id', getContentById);


export default router;