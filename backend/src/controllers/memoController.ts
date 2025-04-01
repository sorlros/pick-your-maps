// const memoService = import("../services/memoService");
import * as memoService from "../services/memoService";
import { Request, Response } from "express";

export const getAllUserMemos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await memoService.getAllMemos(req);

    if (result.status !== 200) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(200).json(result.data);
  } catch (error) {
    console.error("getAllUserMemos 오류", error);
    res.status(500).json({ message: "getAllUserMemos 오류", error })
  }
}

export const createMemo = async (req: Request, res: Response): Promise<void> => {
  try {
    const newMemo = await memoService.createMemo(req);
    res.status(201).json(newMemo);
  } catch (error) {
    res.status(500).json({ message: "메모 생성 실패", error})
  }
}