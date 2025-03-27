// const users = [];

import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserType {
  email: string;
  password: string;
}

export const loginUser = async (req: Request<unknown, unknown, UserType>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요"});
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 잘못되었습니다" });
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email }, // payload
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" } // 토큰 만료 시간 (1시간)
    );

    return res.status(200).json({
      message: "로그인 성공",
      token,
      userId: existingUser.id,
    });
  } catch (error) {
    console.error("로그인 오류", error)
    res.status(500).json({ message: "로그인 서버 오류" });
  }
}

export const createUser = async (userData: UserType) => {
  try {
    // const { email, password } = req.body;
    const { email, password } = userData;
    
    if (!email || !password) {
      // return res.status(400).json({ message: "이메일과 비밀번호를 모두 입력해주세요" });
      return { error: "이메일과 비밀번호를 모두 입력해주세요", status: 400 };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // return res.status(400).json({ message: "이미 존재하는 이메일입니다" });
      return { error: "이미 존재하는 이메일입니다", status: 400 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    })

    if (!newUser.id) {
      return { error: "DB에서 유저생성 실패", status: 400 };
    }
    // if (madeUser) {
    //   const userId = madeUser.id
    //   return { userId, status: 201 };
    // }
    // const newUser = await userService.createUser(req.body);
    // return res.status(201).json({ message: "회원가입 성공", userId: newUser.id });
    console.log("userService: ", newUser);
    return { userId: newUser.id, status: 201 };
  } catch (error) {
    console.error("회원가입 오류:", error);
    return { error: "회원가입 서버 오류", status: 500 };
  }
};
