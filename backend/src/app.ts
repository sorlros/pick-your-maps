import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memoRoutes from "./routes/memoRoutes";

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.use("/api/memo", memoRoutes);
// app.use("/api/user", userRoutes);


export default app;
