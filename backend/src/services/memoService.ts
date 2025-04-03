import { Request } from 'express';
import prisma from '../prisma/client';
import jwt, { JwtPayload } from "jsonwebtoken";

export const getAllMemos = async (req: Request) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "인증 정보가 필요합니다.", status: 401 };
    }

    const token = authHeader.split(" ")[1];
    
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return { error: "userId를 찾을 수 없습니다.", status: 400 };
    }

    const userId = decoded.userId as string;

    const memos = await prisma.memo.findMany({
      where: { userId },
    });
    return { data: memos, status: 200 };
  } catch (error) {
    console.error("getAllMemos 오류", error);
    return { error: "getAllMemos 오류", status: 500 };
  }
}

export const createMemo = async (req: Request) => {
  try {
    const { title, category, memo, tags, userId, rating, coordinate } = req.body;
    const image = req.file ? req.file.path : "";

    const parsedRating = typeof rating === "number" ? rating : parseFloat(rating);
    const parsedTags = Array.isArray(tags) ? tags : tags ? JSON.parse(tags) : [];
    const parsedCoordinate = JSON.parse(coordinate);

    if (!req.body) {
      return { error: "memoData 생성 오류", status: 500 };
    }

    await prisma.memo.create({
      data: {
        title,
        category,
        memo,
        rating: parsedRating,
        tags: parsedTags,
        image, // 이미지 경로 저장
        userId,
        coordinate: parsedCoordinate
      },
    });
    
    // const verifyData = {
    //   title, category, memo, rating: parsedRating, tags: parsedTags, image
    // }
    // console.log("최종data: ", veriData);
    return { 
      message: "메모가 생성되었습니다",
      data: { 
        title, category, memo, rating: parsedRating, tags: parsedTags, image, coordinate: parsedCoordinate 
      },
      status: 201
    };
  } catch (error) {
    console.error("Error creating memo:", error);
    return { message: "메모 생성 실패", status: 500 };
  }
};