import Database from '../../utils/database.js';
import moment from 'moment-timezone';

export const getList = (req, res) => {};

export const postImage = (req, res) => {
  const IMG_URL = `http://localhost:3000/uploads/${req.file.filename}`;
  return res.send({
    url: IMG_URL,
  });
};

export const postBoard = (req, res) => {
  const database = new Database();

  const getParamsFromRequest = (req) => {
    const userId = req.body.userId;
    const writer = req.body.writer;
    const category = req.body.category;
    const title = req.body.title;
    const thumbnail = req.body.thumbnail;
    const content = req.body.content;

    moment.tz.setDefault('Asia/Seoul');
    const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

    return [userId, writer, category, title, thumbnail, content, createdAt];
  };

  const boardInfo = getParamsFromRequest(req);
  const boardQuery = `INSERT INTO Board (user_id, writer, category, title, thumbnail, content, created_at) VALUES (?, ?, ?, ?, ?, ?, ?);`;

  database.query(boardQuery, boardInfo).then(() => {
    return res.send({
      status: 200,
      message: '성공적으로 업로드 되었습니다.',
    });
  });
};
