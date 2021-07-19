var express = require('express');
var usersRouter = express.Router();
let Users = require('../models/usersModel');

/* GET users listing. */
usersRouter
  .get("/", function (req, res, next) {
    res.send("respond with a resource");
  })
  .post("/login", (req, res, next) => {})
  .get("/logout", (req, res, next) => {});

module.exports = usersRouter;
