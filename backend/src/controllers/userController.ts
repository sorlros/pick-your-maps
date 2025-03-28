import * as userService from "../services/userService";
import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.loginUser(req.body);
    
    if (result.error) {
      res.status(result.status).json({ message: result.error });
      return;
    }

    res.status(result.status).json({
      message: "로그인 성공",
      token: result.token,
      userId: result.userId,
    });
  } catch (error) {
    console.error("userController > loginUser 오류:", error);
    res.status(500).json({ message: "로그인 서버 오류" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userService.createUser(req.body);

    // if (result.error) {
    //   return res.status(result.status).json({ message: result.error });
    // }

    if (result.error) {
      res.status(result.status).json({ message: result.error });
      return; // 반환을 명확히 하기 위해 추가
    }
    console.log("userController > createUser: ", result);
    res.status(result.status).json({ userId: result.userId, message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 컨트롤러 오류:", error);
    res.status(500).json({ message: "유저 생성 실패" });
  }
};

