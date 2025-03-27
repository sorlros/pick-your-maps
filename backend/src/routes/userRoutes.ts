import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

// // 유저 관련 엔드포인트
router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);
// 반환 타입이 달라서 생기는 오류 확인 할 것

export default router;


