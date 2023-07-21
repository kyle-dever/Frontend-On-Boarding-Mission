import Database from '../../utils/database.js';
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const signin = (req, res) => {
  moment.tz.setDefault('Asia/Seoul');
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

  const database = new Database();
  const userInfo = [
    req.body.email,
    req.body.pw,
    req.body.userName,
    req.body.phoneNumber,
    createdAt,
  ];

  const isExistEmailQuery = `SELECT * FROM User WHERE email = ?;`;

  database
    .query(isExistEmailQuery, req.body.email)
    .then((result) => isDuplicateEmail(result.length != 0));

  const isDuplicateEmail = (flag) => {
    if (flag) {
      return res.status(409).json({
        code: 409,
        message: '중복된 이메일입니다.',
      });
    } else {
      const queryString = `INSERT INTO User (email, pw, user_name, phone_number, created_at) VALUES (?, ?, ?, ?, ?);`;
      database.query(queryString, userInfo).then(() => {
        return res.status(201).json({
          code: 201,
          message: '회원가입 성공',
        });
      });
    }
  };
};

export const login = (req, res, next) => {
  dotenv.config();

  const database = new Database();
  let userInfo = {};
  const params = [req.body.email, req.body.pw];

  database
    .query(`SELECT * FROM User WHERE email = ? AND pw = ?;`, params)
    .then((result) => {
      if (!result) {
        return res.status(400).json({
          code: 400,
          message: '이메일 또는 비밀번호를 확인해주세요.',
        });
      } else {
        userInfo = result[0];
        createToken();
      }
    })
    .then(() => database.close());

  const createToken = () => {
    const userId = userInfo.user_id;
    const payloads = [userInfo.email, userInfo.name];

    const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: '14d',
      issuer: 'admin',
    });

    const accessToken = jwt.sign({ payloads }, process.env.JWT_SECRET, {
      expiresIn: '15m',
      issuer: 'admin',
    });

    const params = [userId, refreshToken, accessToken];

    const signedUser = {
      userId: userInfo.user_id,
      userName: userInfo.user_name,
    };

    const queryString =
      `INSERT INTO Token VALUES (?, ?, ?) ` +
      `ON DUPLICATE KEY UPDATE ` +
      `refresh_token = values(refresh_token), ` +
      `access_token = values(access_token)`;
    database.query(queryString, params).then(() => {
      return res.status(200).json({
        code: 200,
        message: 'token is created',
        refreshToken: refreshToken,
        accessToken: accessToken,
        userInfo: signedUser,
      });
    });
  };
};

export const reissue = (req, res, next) => {
  const database = new Database();
  const refreshToken = req.body.refreshToken;

  dotenv.config();
  try {
    req.decoded = jwt.verify(req.body.refreshToken, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    } else {
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다.',
      });
    }
  }

  const accessToken = jwt.sign({ refreshToken }, process.env.JWT_SECRET, {
    expiresIn: '15m',
    issuer: 'admin',
  });

  database
    .query(`UPDATE Token SET access_token = ? WHERE refresh_token = ?;`, [
      accessToken,
      refreshToken,
    ])
    .then(() => {
      return res.send({
        status: 200,
        message: 'New Token Issued',
        accessToken: accessToken,
      });
    });
};

export const submit = (req, res) => {
  const database = new Database();
  // const { user_id, phone_number, user_name } = req.body;
  const phoneNumber = req.body.phoneNumber;
  const userName = req.body.name;

  console.log([userName, phoneNumber], req.body);
  const submitQuery = `
    SELECT email FROM user WHERE user_name = ? && phone_number = ?;
  `;

  console.log(submitQuery);

  database
    .query(submitQuery, [userName, phoneNumber])
    .then((response) => {
      console.log(response);
      console.log('dddd');
      return res.status(200).json({
        code: 200,
        message: 'token is created',
        email: response,
      });
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      return res.status(500).json({
        code: 500,
        message: '데이터 베이스에 없습니다.',
      });
    });
};
