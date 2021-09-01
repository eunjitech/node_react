import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  let user = this;
  //비밀번호가 바뀌면
  if (user.isModified("password")) {
    //비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
    //비밀번호 이외에 다른게 변경되면
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //요쳥받은 비밀번호와 암호화된 비밀번호가 맞는지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  //jsonwebtoken이용해서 토큰 생성하기
  const token = jwt.sign(user._id.toHexString(), "1234");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;
  //토근을 디코드
  jwt.verify(token, "1234", function (err, decoded) {
    //유저 아이디 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 토큰과 db에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

//스키마를 데이터베이스 서버로 넣어주기 위함
export const User = mongoose.model("User", userSchema);

//module.exports = { User };
