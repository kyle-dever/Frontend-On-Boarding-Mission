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
};

export const getListFromCategory = (req, res) => {
  const database = new Database();

  const category = req.query.category;
  const countQuery = `SELECT COUNT(*) AS count FROM Board WHERE category = ?`;

  let count;
  database
    .query(countQuery, category)
    .then((result) => {
      count = result[0].count;

      let page;
      if (req.query.page && req.query.page > 1) page = req.query.page;
      else page = 1;

      let offset;
      if (page == 1) offset = 0;
      else offset = (page - 1) * 10;

      const boardQuery = `SELECT * FROM Board WHERE category = ? ORDER BY board_id DESC LIMIT 10 OFFSET ${offset}`;

      return database.query(boardQuery, [category, page]);
    })
    .then((result) => {
      const hasNext = result.length == 10 ? true : false;
      return res.send({
        status: 200,
        boards: result,
        totalCount: count,
        hasNext: hasNext,
      });
    });
};
