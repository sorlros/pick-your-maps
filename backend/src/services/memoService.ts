// import { Request, Response } from 'express';
import prisma from '../prisma/client';

// interface MemoState {
//   userId: number;
//   content: string;
//   vote: number;
// }

interface MemoData {
  title: string;
  category: string;
  memo: string;
  rating: number;
  tags: string[];
  userId: string;
  file?: string;
}

// const memos: MemoState[] = [];

export const getAllMemos = async () => {
  try {
    const memos = await prisma.memo.findMany();
    return memos;
  } catch (error) {
    console.error("getAllMemos 오류", error);
    throw new Error("getAllMemos 오류");
  }
}

export const createMemo = async (memoData: MemoData) => {
  try {
    const { title, category, memo, rating, tags, userId } = memoData
    const image = memoData.file;
    
    // const image = req.file ? req.file.path : null;
    // const parsedTags = tags ? JSON.parse(tags) : [];

    const newMemo = {
      title,
      category,
      memo,
      rating,
      tags,
      image: image ? image : null, // 이후 이미지를 불러올때는 서버url/uploads/파일명
      userId
    }

    if (!memoData) {
      return { error: "memoData 생성 오류", status: 500 };
    }

    // console.log("Received Memo Data:", { newMemo });

    // const newMemo = await prisma.memo.create({
    //   data: {
    //     title,
    //     category,
    //     memo,
    //     rating,
    //     tags,
    //     image,
    //   },
    // });

    console.log("Created Memo:", newMemo, "dataType", typeof image); // 응답 데이터 로그 추가

    // res.status(201).json(newMemo); // 정상적으로 데이터를 반환
    // res.status(200).json({ success: true, memo: newMemo });
    // res.status(201).json({
    //   message: "메모가 생성되었습니다.",
    //   data: { title, category, memo, rating, tags, image },
    // });
    return { 
      message: "메모가 생성되었습니다",
      data: { title, category, memo, rating, tags, image },
      status: 201
    };
  } catch (error) {
    console.error("Error creating memo:", error);
    // res.status(500).json({ success: false, error: '메모 생성 실패' });
    return { message: "메모 생설 실패", status: 500 };
  }
}