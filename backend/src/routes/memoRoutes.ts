import express from "express";
import * as memoController from "../controllers/memoController";

const router = express.Router();
// const memoController = import("../controllers/memoController");


router.get("/getAllMemos", memoController.getMemos);
router.post("/createMemo", memoController.createMemo);

export default router;