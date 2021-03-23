const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  });
};

emailBaseVerifications = (req, res, next) => {
  if (req.body.email.length > 256 || req.body.email.length < 5) {
    res.status(400).send({
      message: "Failed! Invalid Email!",
    });
    return;
  }

  req.body.email = req.body.email.toLowerCase();

  next();
};

passwordBaseVerifications = (req, res, next) => {
  if (req.body.password.length > 256 || req.body.password.length < 8) {
    res.status(400).send({
      message: "Password must be within 8 and 256 characters long",
    });
    return;
  }

  next();
};

nameBaseVerifications = (req, res, next) => {
  if (
    req.body.firstname.length > 256 ||
    req.body.firstname.length < 3 ||
    req.body.lastname.length > 256 ||
    req.body.lastname.length < 3
  ) {
    res.status(400).send({
      message: "Name must be within 8 and 256 characters long",
    });
    return;
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  emailBaseVerifications,
  passwordBaseVerifications,
  nameBaseVerifications,
};

module.exports = verifySignUp;
