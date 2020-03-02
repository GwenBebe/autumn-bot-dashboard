const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "webserver3.pebblehost.com",
  user: "autumnfo_admin",
  password: "9p4kd%DkOw96",
  database: "autumnfo_discordbot"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database: Discord Login Api")
});
const router = express.Router();
const app = express();

const CLIENT_ID = '672548437346222110';
const CLIENT_SECRET = '9Gw1yqL0qiELg9d7jYQ-IOpXkcw_o6jq';

app.use(cookieParser());
router.use(requestIp.mw());

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds&response_type=code&redirect_uri=${encodeURIComponent(`${req.protocol}://${req.get('host')}/api/discord/callback`)}`);
});

router.get('/invite/:guildID', catchAsync(async (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&guild_id=${req.params.guildID}&permissions=8&response_type=code&redirect_uri=${encodeURIComponent(`${req.protocol}://${req.get('host')}/api/discord/callback/invite`)}&scope=bot%20guilds`)
}));

router.get('/callback/invite', catchAsync(async (req, res) => {
  console.log(req.query);
  res.redirect(`/close-popup?guild=${req.query.guild_id}`)
}));

router.get('/logout', (req, res) => {
  const ip = req.clientIp;

  var sql = `DELETE FROM dashboardlogins WHERE userIP = '${ip}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });

  res.redirect('/');
})

router.get('/callback', catchAsync(async (req, res) => {
    console.log(req.query);
    if (!req.query.code) throw new Error('NoCodeProvided');
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    const code = req.query.code;
    const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(`${req.protocol}://${req.get('host')}/api/discord/callback`)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${creds}`,
        },
      });
    const json = await response.json();
    const response1 = await fetch(`http://discordapp.com/api/users/@me`,
      {
          method: 'POST',
          headers: {
          Authorization: `Bearer ${json.access_token}`,
      },
      });
    const userInfo = await response1.json();

    var sql = `INSERT INTO dashboardlogins (userIP, accessToken, tokenExpire) VALUES ('${ip}', '${json.access_token}', ${Date.now() + 604800000})`;

    con.query(sql, function (err, result) {
    if (err) throw err;
          console.log("1 record inserted");
          res.redirect(`/home`);
    });
 }));

module.exports = router;