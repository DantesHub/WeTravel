const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const uuid = require("uuid/v4");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Dante Kim",
    email: "test@gmail.com",
    password: "test"
  }
];

exports.getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password != password) {
    throw new HttpError("Login credentials are incorrect", 401);
  }
  res.json({ message: "Logged in" });
};

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(u => u.email === email);
  if (hasUser) {
    throw new HttpError("User already exists", 422);
  }
  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};
