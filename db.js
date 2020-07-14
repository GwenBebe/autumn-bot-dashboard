const mysql = require('mysql');

const SQL_HOST = "";
const SQL_USER = ""
const SQL_PASS = "";
const SQL_BASE = "";

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
