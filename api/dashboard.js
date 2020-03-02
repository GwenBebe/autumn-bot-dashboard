const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
const mysql = require('mysql');
const { check, validationResult } = require('express-validator');

const SQL_HOST = "webserver3.pebblehost.com";
const SQL_USER = "autumnfo_admin";
const SQL_PASS = "9p4kd%DkOw96";
const SQL_BASE = "autumnfo_discordbot";

var con = mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASS,
    database: SQL_BASE
  });
  
var router = express.Router();

router.use(requestIp.mw());

router.post('/update/:module/:guildID', function (req, res) {
    console.log(req.body);
})

module.exports = router;