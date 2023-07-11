import connection from "../../database/database.js"
import crypto from 'crypto';

export const signin = (req, res) => {
  const userInfo = [
    req.body.email, req.body.pw, req.body.userName, req.body.phoneNumber,
  ];

  const isExistEmailQuery = `SELECT * FROM User WHERE email = ?;`

  connection.query(isExistEmailQuery, req.body.email, (err, result) => {
    isDuplicateEmail(result.length != 0)
  })

  const isDuplicateEmail = (flag) => {
    if(flag) {
      return res.status(409).json({
          code: 409,
          message: "중복된 이메일입니다.",
      })
    }
    else {
        const queryString = `INSERT INTO User (email, pw, user_name, phone_number) VALUES (?, ?, ?, ?);` 
        connection.query(queryString, userInfo, (err, result) => {
            return res.status(201).json({
                code: 201,
                message: "회원가입 성공",
            })
        }
        )
    }
  }
}

export const login = (req, res, next) => {
  let userInfo = {}
  const params = [req.body.email, req.body.pw]

  connection.query(`SELECT * FROM User WHERE email = ? AND pw = ?;`, params, (err, data) => {
    if(!data) {
      return res.status(400).json({
        code: 400,
        message: "이메일 또는 비밀번호를 확인해주세요.",
      });
    }
    else {
      userInfo = data[0];
      createToken();
    }
  });

  const createToken = () => {
    let token = ""
    let salt = ""
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(userInfo.pw, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
        console.log(key.toString('base64'))
        token = key.toString('base64')
        salt = buf.toString('base64')

        insertToken(token, salt, currentDate)
      });
    });
  }

  const insertToken = (token, salt, date) => {
    const params = [token, salt, date]
    connection.query(`INSERT INTO Token VALUES (?, ?, ?);`, params, (err, data) => {
      return res.status(200).json({
        code: 200,
        message: "token is created",
        token: token,
      });
    })
  }
}