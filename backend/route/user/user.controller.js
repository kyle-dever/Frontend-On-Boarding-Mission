import connection from "../../database/database.js"

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

export const login =  (req, res, next) => {
  const key = "dever";
  // 받은 요청에서 db의 데이터를 가져온다 (로그인정보)
  let isError = false;

  let userInfo = {}
  const params = [req.body.email, req.body.pw]

  connection.query(`SELECT * FROM User WHERE email = ? AND pw = ?;`, params, (err, data) => {
    userInfo = data;
  });

  if(!userInfo) {
    return res.status(400).json({
      code: 400,
      message: "이메일 또는 비밀번호를 확인해주세요.",
    });
  }

  let token = "";

  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  token = jwt.sign(
    {
      type: "JWT",
      email: userInfo.email,
      userName: userInfo.user_name,
    },
    key,
    {
      expiresIn: "15m", // 15분후 만료
      issuer: "토큰발급자",
    }
  );

  // response
  return res.status(200).json({
    code: 200,
    message: "token is created",
    token: token,
  });
}