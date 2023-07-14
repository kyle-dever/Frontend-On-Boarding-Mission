// 외부 라이브러리
import express from "express";

// Middleware
import { auth } from "./middleware/authMiddleware.js";
import userRouter from "./route/user/user.js";

const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

app.get("/api/payload", auth, (req, res) => {
  return res.status(200).json({
    code: 200,
    message: "토큰이 정상입니다.",
  });
});
