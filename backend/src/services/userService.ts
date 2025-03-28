import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserType {
  email: string;
  password: string;
}

export const loginUser = async (userData: UserType) => {
  try {
    const { email, password } = userData;

    if (!email || !password) {
      return { error: "이메일과 비밀번호를 모두 입력해주세요", status: 400 };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return { error: "이메일 또는 비밀번호가 잘못되었습니다", status: 401 };
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return { error: "이메일 또는 비밀번호가 잘못되었습니다", status: 401 };
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email }, // payload
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" } // 토큰 만료 시간 (1시간)
    );

    if (!token) {
      return { error: "jwt 토큰 생성에 실패 했습니다.", status: 500};
    }
    
    return { userId: existingUser.id, token, status: 200 };
  } catch (error) {
    console.error("로그인 오류", error)
    return { error: "로그인 서버 오류", status: 500 };
  }
}

export const createUser = async (userData: UserType) => {
  try {
    const { email, password } = userData;
    
    if (!email || !password) {
      return { error: "이메일과 비밀번호를 모두 입력해주세요", status: 400 };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
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
    
    // console.log("userService: ", newUser);
    return { userId: newUser.id, status: 201 };
  } catch (error) {
    console.error("회원가입 오류:", error);
    return { error: "회원가입 서버 오류", status: 500 };
  }
};
