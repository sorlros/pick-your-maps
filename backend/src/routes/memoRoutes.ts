import express from "express";
// import multer from "multer";
import * as memoController from "../controllers/memoController";
import upload from "../middlewares/multer";

const router = express.Router();


router.get("/getAllMemos", memoController.getAllUserMemos);
router.post("/createMemo", upload.single("image"), memoController.createMemo);

export default router;