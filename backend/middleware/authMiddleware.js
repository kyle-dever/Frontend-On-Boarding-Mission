import Database from '../database/database.js';
import crypto from 'crypto';
import moment from 'moment';
import 'moment-timezone';

export const auth = (req, res, next) => {
  const database = new Database();
  let error = '';

  const expireCheck = (createdAt) => {
    moment.tz.setDefault('Asia/Seoul');
    const currentDate = moment();

    if (currentDate - createdAt > 10) {
      return 'ExpiredToken';
    }
    return '';
  };

  const token = req.headers.authorization;
  const tokenQueryString = `SELECT * FROM Token WHERE access_token = ?;`;
  let tokenInfo = {};
  database.query(tokenQueryString, token).then((result) => {
    tokenInfo = result[0];
    error = expireCheck(tokenInfo.created_at);
    if (error == 'ExpiredToken') {
      errHandle();
      return;
    } else findUser();
  });

  const decodeCrypto = async (token, salt) => {
    return await new Promise((resolve) => {
      const iv = Buffer.alloc(16, 0);
      const decipher = crypto.createDecipheriv('aes-256-cbc', salt, iv);
      let result = decipher.update(token, 'base64', 'utf8');
      result += decipher.final('utf8');
      resolve(result);
    });
  };

  const findUser = () => {
    const userQueryString = `SELECT * FROM User WHERE user_id = ?;`;
    let userInfo = {};
    database.query(userQueryString, tokenInfo.user_id).then(async (result) => {
      userInfo = result[0];
      const decodedPw = await decodeCrypto(token, tokenInfo.salt);

      if (decodedPw.localeCompare(userInfo.pw) != 0) {
        error = 'InvalidToken';
      }
      errHandle();
    });
  };

  const errHandle = () => {
    if (error == 'ExpiredToken') {
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다.',
      });
    } else if (error == 'InvalidToken') {
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다.',
      });
    } else {
      next();
    }
  };
};
