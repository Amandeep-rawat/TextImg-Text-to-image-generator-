import multer from 'multer'
import { Router } from "express";

import {generateImage} from "../controller/imageController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { removeBackground } from "../controller/bgRemovalController.js";
import upload from "../middlewares/multer.js"
const router=Router();

router.post('/generate',isAuthenticated,generateImage);
router.post('/removebg',isAuthenticated,upload.single('image_file'),removeBackground);



export default router;