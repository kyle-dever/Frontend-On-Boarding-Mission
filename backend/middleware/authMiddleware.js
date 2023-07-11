import connection from "../database/database.js"
import crypto from 'crypto';

export const auth = (req, res, next) => {
  const token = req.headers.authorization;
  
  let tokenInfo = {};
  const tokenQueryString = `SELECT * FROM Token WHERE access_token = ?;`
  connection.query(tokenQueryString, token, (err, result) => {
    tokenInfo = result[0];
    expireCheck();
  })

  const expireCheck = () => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if ((currentDate - tokenInfo.create_at) > 900000) {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
      });
    }
  }

  let userInfo = {}
  const userQueryString = `SELECT * FROM User WHERE user_id = ?;`
  connection.query(userQueryString, tokenInfo.user_id, (err, result) => {
    userInfo = result[0];

    if (userInfo.pw != decodeCrypto()) {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  })

  const decodeCrypto = () => {
    let decodedPw = '';
    crypto.pbkdf2(token, tokenInfo.salt, 100000, 64, 'sha256', (err, key) => {
      decodedPw = key.toString('base64')
    });
    return decodedPw;
  }

  return next();
};