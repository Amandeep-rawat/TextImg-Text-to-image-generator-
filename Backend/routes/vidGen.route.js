import express from "express";
import { getVideo } from "../controller/getvideoscriptController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.get('/api/videos',isAuthenticated, getVideo);

export default router;
