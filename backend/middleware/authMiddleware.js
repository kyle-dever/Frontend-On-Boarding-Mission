import Database from "../database/database.js";
import crypto from 'crypto';

export const auth = async (req, res, next) => {
  const database = new Database
  let isErrorOccured = false

  const expireCheck = (createdAt) => {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if ((currentDate - createdAt) > 10000) {
      return 'ExpiredToken'
    }
    return ''
  }

  const decodeCrypto = async (token, salt) => {
    return await new Promise ((resolve) => {
      crypto.pbkdf2(token, salt, 100000, 64, 'sha256',(err, key) => {
        resolve(key)
      })
    })
  }

  const token = req.headers.authorization;
  const tokenQueryString = `SELECT * FROM Token WHERE access_token = ?;`
  let tokenInfo = {}
  database.query(tokenQueryString, token).then((result) => {
    tokenInfo = result[0]
    if (expireCheck(tokenInfo.created_at) == 'ExpiredToken')
      isErrorOccured = true
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다.",
    });
  })

  const userQueryString = `SELECT * FROM User WHERE user_id = ?;`
  let userInfo = {}
  database.query(userQueryString, tokenInfo.user_id).then((result) => {
    if (userInfo.pw != decodeCrypto(token, tokenInfo.salt)) {
      isErrorOccured = true
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  })
  
  if(!isErrorOccured) next();
};