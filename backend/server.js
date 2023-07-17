// 내장 라이브러리
import path from 'path';

// 외부 라이브러리
import express from 'express';

// Middleware
import { auth } from './middleware/authMiddleware.js';
import userRouter from './route/user/user.js';
import boardRouter from './route/board/board.js';

const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

app.use('/api/user', userRouter);
app.use('/api/board', auth, boardRouter);

app.get('/', (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

app.get('/api/payload', auth, (req, res) => {
  return res.status(200).json({
    code: 200,
    message: '토큰이 정상입니다.',
  });
});
