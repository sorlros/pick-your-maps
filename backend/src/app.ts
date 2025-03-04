import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 라우트 설정
// import userRoutes from "./routes/userRoutes";
// app.use("/api/users", userRoutes);

export default app;
