// const memoService = import("../services/memoService");
import * as memoService from "../services/memoService";
import { Request, Response } from "express";

export const getMemos = async (req: Request, res: Response) => {
  try {
    const memos = await memoService.getAllMemos();
    res.json(memos);
  } catch (error) {
    res.status(500).json({ message: "메모 로드 실패", error })
  }
}

export const createMemo = async (req: Request, res: Response) => {
  try {
    const newMemo = await memoService.createMemo(req, res);
    res.status(201).json(newMemo);
  } catch (error) {
    res.status(500).json({ message: "메모 생성 실패", error})
  }
}