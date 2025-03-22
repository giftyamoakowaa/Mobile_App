import express from "express";
import { SignUp, loginUser } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", SignUp);
router.post("/login", loginUser);

export default router;
