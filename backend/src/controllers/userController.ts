import * as userService from "../services/userService";
import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.loginUser(req, res);
    
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "로그인에 실패했습니다" });
    }
  } catch (error) {
    res.status(500).json({ message: "userService.login 오류", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req, res);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "유저 생성 실패", error });
  }
};

