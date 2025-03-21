import { Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../../uploads");

// 디렉토리 자동생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 저장 위치 및 파일명 설정
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/"); // 파일 저장 경로
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // 파일명 고유하게 생성
  },
});

// Multer 설정 객체 (파일 단일 업로드)
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 최대 10MB 파일 크기 제한
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    // 허용된 확장자만 받기
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("이미지 파일만 업로드 가능합니다."));
    }
    cb(null, true);
  },
});

export default upload;