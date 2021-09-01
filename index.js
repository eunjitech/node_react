const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");
const { User } = require("./models/User");
const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("Hello World"));

app.post("/register", (req, res) => {
  //회원가입할 때 필요한 정보를 클라이언트에서 가져오면 데이터베이스에 넣어준다.
  const user = new User(req.body);

  //mongoDB에서 오는 메서드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  //데이터베이스에 요청된 이메일을 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데베에 있으면 맞는 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      //비밀번호 까지 맞다면 토큰 생성
      user.generateToken((err, user) => {});
    });
  });

  //비밀번호까지 맞다면 토큰 생성
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
