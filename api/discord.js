const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const { catchAsync } = require('../utils');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
var con = require(__dirname + '/../db.js');
const router = express.Router();
const app = express();

const CLIENT_ID = '672548437346222110';
const CLIENT_SECRET = '9Gw1yqL0qiELg9d7jYQ-IOpXkcw_o6jq';

async function getProfile(userID) {
  return new Promise((resolve, reject) => {
      con.query(
          "SELECT * FROM profiles WHERE userID = '" + userID + "' LIMIT 1",
          (err, result) => {
              return err ? reject(err) : resolve(result[0]);
          })
  })
}

async function getUserInfo(ip) {
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM dashboardlogins WHERE userIP = '" + ip + "' LIMIT 1",
            (err, result) => {
                return err ? reject(err) : resolve(result[0]);
            })
    })
}

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
  var backURL = req.header('Referer') || '/';
  const ip = req.clientIp;

  var sql = `DELETE FROM dashboardlogins WHERE userIP = '${ip}'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });

  res.redirect(backURL);
})

router.get('/callback', catchAsync(async (req, res) => {
    if (!req.query.code)
    {
      res.redirect('/home');
      throw new Error('NoCodeProvided');
    }

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

    var profile = await getProfile(userInfo.id);

    if(!profile)
    {
      var profileOBJ = {
          userID: userInfo.id,
          username: userInfo.username,
          tag: userInfo.discriminator,
          avatar: userInfo.avatar,
          color: "f13128",
          pronouns: "n/a",
          gender: "",
          age: "",
          biography: ""
      }

      var final = JSON.stringify(profileOBJ);

      var a = 0;
      var count = 0;
      for (a = 0; a < JSON.stringify(profileOBJ).length; a++) {
          if (JSON.stringify(profileOBJ).charAt(a) == "'") {
              final = [final.slice(0, a + count), '\\', final.slice(a + count)].join('');
              count++;
          }
      }

      var sql = `INSERT INTO profiles (userID, profile) VALUES ('${userInfo.id}','${final}')`;
  
      con.query(sql, function (err, result) {
      if (err) throw err;
            console.log("1 record inserted");
      });
    }

    var accessToken = req.cookies.access_token;

    if(!accessToken)
    {
      res.cookie('access_token', json.access_token, {expire: 604800000 + Date.now()}); 
    }
    res.redirect(`/profile/${userInfo.id}`);
 }));

module.exports = router;