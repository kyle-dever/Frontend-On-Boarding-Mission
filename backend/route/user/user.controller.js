import Database from "../../database/database.js"
import crypto from 'crypto';

export const signin = (req, res) => {
  const database = new Database
  const userInfo = [
    req.body.email, req.body.pw, req.body.userName, req.body.phoneNumber,
  ];
  
  const isExistEmailQuery = `SELECT * FROM User WHERE email = ?;`

  database.query(isExistEmailQuery, req.body.email)
      .then(result => isDuplicateEmail(result.length != 0))

  const isDuplicateEmail = (flag) => {
    if(flag) {
      return res.status(409).json({
          code: 409,
          message: "중복된 이메일입니다.",
      })
    }
    else {
        const queryString = `INSERT INTO User (email, pw, user_name, phone_number) VALUES (?, ?, ?, ?);` 
        database.query(queryString, userInfo)
        .then(() => {
          return res.status(201).json({
            code: 201,
            message: "회원가입 성공",
        })})
    }
  }
}

export const login = (req, res, next) => {
  const database = new Database
  let userInfo = {}
  const params = [req.body.email, req.body.pw]

  database.query(`SELECT * FROM User WHERE email = ? AND pw = ?;`, params)
    .then((result) => {
      if(!result) {
        return res.status(400).json({
          code: 400,
          message: "이메일 또는 비밀번호를 확인해주세요.",
        });
      }
      else {
        userInfo = result[0];
        createToken();
      }
    })
  
  const createToken = () => {
    const userId = userInfo.user_id
    let token = ""
    let salt = ""
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(userInfo.pw, buf.toString('base64'), 100000, 64, 'sha256', (err, key) => {
        token = key.toString('base64')
        salt = buf.toString('base64')

        insertToken(userId, token, salt, currentDate)
      });
    });
  }

  const insertToken = (userId, token, salt, date) => {
    const params = [userId, token, salt, date]
    const queryString = `INSERT INTO Token VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE `
      + `access_token = VALUES(access_token), `
      + `salt = VALUES(salt), `
      + `created_at = VALUES(created_at);`
    database.query(queryString, params)
      .then (()=>{
        return res.status(200).json({
          code: 200,
          message: "token is created",
          token: token,
        });
      })
  }

  
}