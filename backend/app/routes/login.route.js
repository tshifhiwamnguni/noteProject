const express = require('express');
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const controller = require('../controllers/login.controller');

app.post('/login', controller.login);

module.exports = app;