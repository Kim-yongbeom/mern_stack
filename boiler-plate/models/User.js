const mongoose = require("mongoose");

// 암호화 라이브러리
const bcrypt = require("bcrypt");
const saltRounds = 10;

// 토큰 생성
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
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

// save하기 전에 실행하겠다는 뜻, save는 index.js에서 진행중
userSchema.pre("save", function (next) {
  var user = this;

  // 모델 필드중 password가 변환될때만
  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      // 사용자의 실제 비밀번호를 넣어줌
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plainPassword 1234567 암호화된 비밀번호 $2b$10$C/ZwpC7x67gWn4K7xyBRMecRf5/tpHBJoPy4YUxWhwJd9dq4XDbtm
  // 두개가 같은지 체크
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    // cd = callback
    if (err) {
      return cb(err);
    }
    // 에러가 없고 매치된다는 뜻
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  // jsonwebtoken을 이용해서 token 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id + 'secretToken' = toekn
  // ->
  // 'secretToken' -> user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
