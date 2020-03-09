const mysql = require('mysql');

const SQL_HOST = "webserver3.pebblehost.com";
const SQL_USER = "autumnfo_admin";
const SQL_PASS = "9p4kd%DkOw96";
const SQL_BASE = "autumnfo_discordbot";

var con = mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASS,
    database: SQL_BASE,
    charset : 'utf8mb4'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('CONNECTED TO DATABASE')
});

module.exports = con;