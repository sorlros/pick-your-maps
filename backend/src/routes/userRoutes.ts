import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

// // 유저 관련 엔드포인트
router.get("/login", userController.loginUser);
router.post("/register", userController.createUser);

export default router;


