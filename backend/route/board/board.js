import { Router } from 'express';
import * as boardMiddleware from './board.controller.js';
import multer from 'multer';
import path from 'path';
const __dirname = path.resolve();

const router = Router();

// multer 설정
const upload = multer({
  storage: multer.diskStorage({
    // 저장할 장소
    destination(req, file, cb) {
      cb(null, path.join(__dirname, './public/uploads'));
    },
    // 저장할 이미지의 파일명
    filename(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString(
        'utf8'
      );
      const ext = path.extname(file.originalname); // 파일의 확장자
      // 파일명이 절대 겹치지 않도록 해줘야한다.
      // 파일이름 + 현재시간밀리초 + 파일확장자명
      cb(
        null,
        path.basename(file.originalname, ext) +
          new Date().toISOString().replace(/:/g, '-') +
          ext
      );
    },
  }),
});

router.post('/upload/image', upload.single('img'), boardMiddleware.postImage);
router.post('/upload/board', boardMiddleware.postBoard);

export default router;
