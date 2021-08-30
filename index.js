const express = require("express");
const app = express();
const port = 5000;

const { User } = require("./models/User");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://eunji:379214@cluster0.at4bs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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

app.listen(port, () => console.log(`Listening on port ${port}!`));
