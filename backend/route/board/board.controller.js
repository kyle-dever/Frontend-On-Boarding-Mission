import Database from '../../database/database.js';

export const getList = (req, res) => {};
export const postImage = (req, res) => {
  const IMG_URL = `http://localhost:3000/uploads/${req.file.filename}`;
  return res.send({
    url: IMG_URL,
  });
};
