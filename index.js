const express = require('express');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const querystring = require('querystring');
const fetch = require("node-fetch");
const path = require('path');
const http = require('http');
const mysql = require('mysql');
const expressip = require('express-ip');
const { catchAsync } = require(__dirname + '/utils');
const Discord = require('discord.js');
const client = new Discord.Client();
const btoa = require('btoa');
const puppeteer = require('puppeteer');
const CLIENT_ID = '672548437346222110';
const CLIENT_SECRET = '9Gw1yqL0qiELg9d7jYQ-IOpXkcw_o6jq';
const BOT_TOKEN = "NjcyNTQ4NDM3MzQ2MjIyMTEw.XlqgFw.kmBSFsir4CYtj26HHuI7UeJySjc";
client.login('NjcyNTQ4NDM3MzQ2MjIyMTEw.XlcMXg.LQQedtk5Jk8KVL0Q3z26997e4Zk');

var con = mysql.createConnection({
  host: "webserver3.pebblehost.com",
  user: "autumnfo_admin",
  password: "9p4kd%DkOw96",
  database: "autumnfo_discordbot"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database: Index");
});

var port = process.env.PORT || 3000;
var app = express();

app.enable('trust proxy');

app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
// Routes
app.use('/api/discord', require('./api/discord'));
app.use('/api/dashboard', require('./api/dashboard'));

app.use(expressip().getIpInfoMiddleware);

app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});

app.set('views', __dirname + '/views');
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');


function getUserInfo(ip){
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM dashboardlogins WHERE userIP = '" + ip + "' LIMIT 1", 
      (err, result) => {
        return err ? reject(err) : resolve(result[0]);
      })
  })
}

function deleteUserInfo(ip){
  con.query(
    "DELETE FROM dashboardlogins WHERE userIP = '" + ip + "'", 
    (err, result) => {
      console.log("Deleted " + result.affectedRows + " row(s)")
    })
}

async function getAccessToken(req){
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  const loginInfo = await getUserInfo(ip);

  if(loginInfo){
    var accessToken = loginInfo.accessToken;
    var tokenExpire = loginInfo.tokenExpire;

    if(tokenExpire < Date.now())
    {
      deleteUserInfo(ip);
      return undefined;
    }
    else
    {
      return accessToken;
    }
  }
  else
  {
    return undefined;
  }
}

//---------------------------------------//
app.get('/', (req, res) => {
  console.log(req.protocol);
  res.redirect('/home')
});

app.get('/login', (req, res) => {
  res.redirect(`api/discord/login`);
});

app.get('/logout', (req, res) => {
  res.redirect('api/discord/logout')
})

app.get('/close-popup*', (req, res) => {
  res.render('close-popup')
})
/*

*/
app.get('/dashboard/:guildID', catchAsync( async (req, res) => {
    const accessToken = await getAccessToken(req);
    
      if(accessToken){
          const guildResponse = await fetch(`http://discordapp.com/api/guilds/${req.params.guildID}`,
          {
              method: 'GET',
              headers: {
              Authorization: `Bot ${BOT_TOKEN}`,
              },
          });    
          const guild = await guildResponse.json();
          var str = guild.name;
          var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
          var acronym = matches.join('');
    
          guild.acro = acronym;

          const response = await fetch(`http://discordapp.com/api/users/@me`,
          {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
          });
          const userInfo = await response.json()
          res.render('guild-dashboard', {
            loggedIn: true,
            username: userInfo.username,
            tag: userInfo.discriminator,
            guild: guild,
            host: req.get('host'),
            protocol: req.protocol,
          });
      }else{
        res.redirect('/login')
      }
}))

app.get('/dashboard/:guildID/:module', catchAsync( async (req, res) => {
  console.log(req.params.guildID);
  console.log(req.params.module);
  var accessToken = getAccessToken(req);

  if(accessToken){
    const guildResponse = await fetch(`http://discordapp.com/api/guilds/${req.params.guildID}`,
    {
        method: 'GET',
        headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        },
    });
    const guild = await guildResponse.json();
    console.log(guild);
    res.render('verify-module', {
      loggedIn: true,
      username: userInfo.username,
      tag: userInfo.discriminator,
      guild: guild,
      host: req.get('host'),
      protocol: req.protocol,
    })
  }else{
    res.redirect('/login')
  }
}))

app.get('/about', catchAsync(async (req, res) => {
  const accessToken = await getAccessToken(req);

    if(accessToken){

        const response = await fetch(`http://discordapp.com/api/users/@me`,
        {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });
        const userInfo = await response.json()
        res.render('about', {
          loggedIn: true,
          username: userInfo.username,
          tag: userInfo.discriminator,
          servers: client.guilds.array().length.toString(),
          host: req.get('host'),
          protocol: req.protocol,
        });
    }else{
      res.render('about', {
        loggedIn: false,
        host: req.get('host'),
        protocol: req.protocol,
      });
    }
}))

app.get('/dashboard', catchAsync(async (req, res) => {
  const accessToken = await getAccessToken(req)

    if(accessToken){

        const response = await fetch(`http://discordapp.com/api/users/@me`,
        {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });
        const userInfo = await response.json()


        const guildsResponse = await fetch(`http://discordapp.com/api/users/@me/guilds`,
        {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        });
        const guilds = await guildsResponse.json();

        const botGuilds = client.guilds.array();
        const admin = [];
        for(var i = 0; i < guilds.length; i++)
        {
          var permission = guilds[i].permissions;
            if((permission & 0x8) == 0x8) {
            const userGuilds = botGuilds.filter(function(object) {
              return object.id == guilds[i].id;
            })

            if(userGuilds[0]){
              guilds[i].botGuild = true;
            }else{
              guilds[i].botGuild = false;
            }

            var str = guilds[i].name;
            var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
            var acronym = matches.join('');

            guilds[i].acro = acronym;
            admin.push(guilds[i])
          };
        }
        var result = admin.sort(function(a, b) {
          return b.botGuild - a.botGuild})
        res.render('servers', {
          loggedIn: true,
          username: userInfo.username,
          tag: userInfo.discriminator,
          guilds: result,
          host: req.get('host'),
          protocol: req.protocol,
        });
    }else{
      res.redirect('login')
    }
}));

app.get('/invite-bot', catchAsync(async (req, res) => {
  res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=672548437346222110&permissions=8&redirect_uri=http%3A%2F%2Fwww.autumnbot.net%2Fhome&scope=bot');
}));

app.get('/support', catchAsync(async (req, res) => {
  res.redirect('https://discord.gg/DfByvyN');
}));

app.get('/home', catchAsync(async (req, res) => {
    const accessToken = await getAccessToken(req);
  
      if(accessToken){
  
          const response = await fetch(`http://discordapp.com/api/users/@me`,
          {
              method: 'POST', 
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
          });
          const userInfo = await response.json()
          res.render('home', {
            loggedIn: true,
            username: userInfo.username,
            tag: userInfo.discriminator,
            servers: client.guilds.array().length.toString(),
            users: client.users.array().length.toString(),
            channels: client.channels.array().length.toString(),
            host: req.get('host'),
            protocol: req.protocol,
          });
      }else{
        res.render('home', {
          loggedIn: false,
          host: req.get('host'),
          protocol: req.protocol,
        });
      }
}));

app.use(function (req, res, next) {
    res.render('404', {
      host: req.get('host'),
      protocol: req.protocol,
    })
});

app.use((err, req, res, next) => {
    switch (err.message) {
      case 'NoCodeProvided':
        return res.status(400).send({
          status: 'ERROR',
          error: err.message,
        });
      default:
        return res.status(500).send({
          status: 'ERROR',
          error: err.message,
        });
    }
  });