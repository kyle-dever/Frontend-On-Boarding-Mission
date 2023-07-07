// 외부 라이브러리
import express from "express";
import jwt from "jsonwebtoken";

// Middleware
import { auth } from "./authMiddleware.js";

// api
import connection from "./database.js";

const port = 3000;
const app = express();
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.get("/api/", (req, res) => {
    connection.query("SELECT * FROM User", (err, data) => {
        res.send(data);
      });
});

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

app.post("/api/login", (req, res, next) => {
    const key = "DEVER"; // encode, decode를 위한 hash key이다.
  
    var userInfo = {
      email: req.body.email,
      pw: req.body.pw
    }
  
    //email, pw는 String이기 때문에 쿼리문에서 따옴표가 들어가야함
    const email = "'" + userInfo.email + "'"
    const pw = "'" +  userInfo.pw + "'"
  
    connection.query(`SELECT * FROM User WHERE email = ${email} AND pw = ${pw};`, 
        (err, data) => {
            if (!err) {
                userInfo = data;
            } else console.log(err);
        });
  
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
        issuer: "dever",
      }
    );
  
    // response
    return res.status(200).json({
      code: 200,
      message: "token is created",
      token: token,
    });
});

app.get("/api/payload", auth, (req, res) => {
    return res.status(200).json({
        code: 200,
        message: "토큰이 정상입니다.",
    });
});