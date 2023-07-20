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

      const boardQuery = `SELECT board_id, writer, title, thumbnail, created_at FROM Board WHERE category = ? ORDER BY board_id DESC LIMIT 10 OFFSET ${offset}`;

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

export const getBoardFromId = (req, res) => {
  const database = new Database();

  const boardId = req.query.id;
  const boardQuery = `SELECT board_id, writer, title, content, category FROM Board WHERE board_id = ${boardId}`;

  database.query(boardQuery).then((result) => {
    return res.send({
      status: 200,
      board: result[0],
    });
  });
};

export const searchBoardFromKeyword = (req, res) => {
  const database = new Database();

  let boardQuery = `SELECT * FROM Board WHERE `;
  let countQuery = `SELECT COUNT(*) AS count FROM Board WHERE `;

  if (req.query.category != undefined) {
    boardQuery += `category = '${req.query.category}' AND `;
    countQuery += `category = '${req.query.category}' AND `;
  }

  if (req.query.title != undefined) {
    boardQuery += `title LIKE '%${req.query.title}%' AND `;
    countQuery += `title LIKE '%${req.query.title}%' AND `;
  }

  if (req.query.content != undefined) {
    boardQuery += `content LIKE '%${req.query.content}%' AND `;
    countQuery += `content LIKE '%${req.query.content}%' AND `;
  }

  if (req.query.writer != undefined) {
    boardQuery += `writer LIKE '%${req.query.writer}%' AND `;
    countQuery += `writer LIKE '%${req.query.writer}%' AND `;
  }

  boardQuery = boardQuery.replace(/ AND $/, '');
  countQuery = countQuery.replace(/ AND $/, '');

  let count;
  database
    .query(countQuery)
    .then((result) => {
      count = result[0].count;

      let page;
      if (req.query.page && req.query.page > 1) page = req.query.page;
      else page = 1;

      let offset;
      if (page == 1) offset = 0;
      else offset = (page - 1) * 10;

      boardQuery += `ORDER BY board_id DESC LIMIT 10 OFFSET ${offset};`;

      return database.query(boardQuery);
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
