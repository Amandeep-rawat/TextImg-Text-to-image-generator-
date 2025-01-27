import { register,login, userCredits, paymentRazorpay, verifyRazorpay } from "../controller/userController.js";
import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router=Router();

router.post('/register',register);
router.post('/login',login);
router.get('/credits',isAuthenticated,userCredits);
router.post('/pay-razor',isAuthenticated,paymentRazorpay);
router.post('/verify-razor',isAuthenticated,verifyRazorpay);

export default router;