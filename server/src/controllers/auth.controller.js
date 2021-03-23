const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 8);
  },
  createUserInDb: async ({ firstname, lastname, email, password }) => {
    try {
      await User.create({
        firstname,
        lastname,
        email,
        password: module.exports.hashPassword(password),
      });
      return { message: "User registered successfully!" };
    } catch (err) {
      return { message: err.message };
    }
  },
  signup: (req, res) => {
    // Save User to Database
    module.exports
      .createUserInDb({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  findUserInDb: async ({ email }) => {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      return user.dataValues;
    } catch (err) {
      return { message: err.message };
    }
  },
  bcryptCompare: ({ password, savedPassword }) => {
    const passwordIsValid = bcrypt.compareSync(password, savedPassword);

    return passwordIsValid;
  },
  login: (req, res) => {
    module.exports
      .findUserInDb({
        email: req.body.email,
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = module.exports.bcryptCompare({
          password: req.body.password,
          savedPassword: user.password,
        });

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
          id: user.id,
          email: user.email,
          accessToken: token,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  },
};
