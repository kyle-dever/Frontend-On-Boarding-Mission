import Database from '../../utils/database.js';

export const getList = (req, res) => {
  const database = new Database();

  const boardQuery = `SELECT * FROM Board ORDER BY board_id DESC`;
  database.query(boardQuery).then((result) => {
    return res.send({
      status: 200,
      boards: result,
    });
  });
};

export const getCount = (req, res) => {
  const database = new Database();

  const category = req.query.category;
  const boardQuery = `SELECT COUNT(*) AS count FROM Board WHERE category = ?`;

  database.query(boardQuery, category).then((result) => {
    return res.send({
      status: 200,
      count: result[0].count,
    });
  });
};

export const getListFromCategory = (req, res) => {
  const database = new Database();

  const category = req.query.category;
  let page;
  if (req.query.page) page = req.query.page;
  else page = 1;

  const boardQuery = `SELECT * FROM Board WHERE category = ? ORDER BY board_id DESC LIMIT 10 OFFSET ${
    (page - 1) * 10
  }`;
  database.query(boardQuery, [category, page]).then((result) => {
    return res.send({
      status: 200,
      boards: result,
    });
  });
};
