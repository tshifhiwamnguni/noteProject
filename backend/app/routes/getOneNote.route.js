const express = require('express');
const app = express();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

const controller = require('../controllers/getOneNote.controller');

app.get('/getone/:id', controller.getOneNote);

module.exports = app;