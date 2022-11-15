const express = require("express");
const app = express();

const bodyparser = require("body-parser");

app.use(
  bodyparser.urlencoded({
    extended: true,
    limit: "2mb",
    parameterLimit: 100000,
  })
);
app.use(bodyparser.json({ limit: "50mb" }));

const controller = require("../controllers/create.controller");

app.post("/create", controller.create);

module.exports = app;
