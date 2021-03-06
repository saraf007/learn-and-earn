const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// User Signup
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created successfully !',
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err,
          });
        });
    });
}

// User Login
exports.loginUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: 'Auth failed because user does not exist.'
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed because password does not match.'
        });
      }
      const token = jwt.sign(
        {email: User.email, userId: User._id},
        'secret_this_should_be_longer',
         {expiresIn: '1h'}
         );
         return res.status(200).json({
          token: token,
          message: "User logged in successfully !",
          expiresIn: 3600
         });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed.'
      });
    });
}
