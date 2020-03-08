const express = require('express');
const cookieParser = require('cookie-parser');
const fetch = require("node-fetch");
const expressip = require('express-ip');
const {
    catchAsync
} = require(__dirname + '/utils');
const bodyParser = require('body-parser');
const cors = require("cors");
const client = require(__dirname + '/bot.js');
const con = require(__dirname + '/db.js');

var port = process.env.PORT || 3000;
var app = express();

const BOT_TOKEN = "NjcyNTQ4NDM3MzQ2MjIyMTEw.XlqgFw.kmBSFsir4CYtj26HHuI7UeJySjc";

app.enable('trust proxy');

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(cors());
// Routes
app.use('/api/discord', require('./api/discord'));
app.use('/api/dashboard', require('./api/dashboard'));

app.use(expressip().getIpInfoMiddleware);

app.listen(port, function() {
    console.log(`Listening on port ${port}!`);
});

app.set('views', __dirname + '/views');
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');


function escapeSpecialChars(jsonString) {
    return jsonString
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f");

}

function getUserInfo(ip) {
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM dashboardlogins WHERE userIP = '" + ip + "' LIMIT 1",
            (err, result) => {
                return err ? reject(err) : resolve(result[0]);
            })
    })
}

function getProfile(userID) {
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM profiles WHERE userID = '" + userID + "' LIMIT 1",
            (err, result) => {
                return err ? reject(err) : resolve(result[0]);
            })
    })
}

async function getGuildInfo(id) {
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM guildsettings WHERE Guild = '" + id + "' LIMIT 1",
            (err, result) => {
                return err ? reject(err) : resolve(result);
            })
    })
}

function deleteUserInfo(ip) {
    con.query(
        "DELETE FROM dashboardlogins WHERE userIP = '" + ip + "'",
        (err, result) => {
            console.log("Deleted " + result.affectedRows + " row(s)")
        })
}

async function getAccessToken(req) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    const loginInfo = await getUserInfo(ip);

    if (loginInfo) {
        var accessToken = loginInfo.accessToken;
        var tokenExpire = loginInfo.tokenExpire;

        if (tokenExpire < Date.now()) {
            deleteUserInfo(ip);
            return undefined;
        } else {
            return accessToken;
        }
    } else {
        return undefined;
    }
}

//---------------------------------------//
app.get('/', (req, res) => {
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
app.get('/dashboard/:guildID', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    if (accessToken) {
        const guildResponse = await fetch(`http://discordapp.com/api/guilds/${req.params.guildID}`, {
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

        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()
        res.render('guild-dashboard', {
            loggedIn: true,
            userInfo: userInfo,
            guild: guild,
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.redirect('/login')
    }
}))

app.get('/dashboard/:guildID/:module', catchAsync(async(req, res) => {
    var accessToken = await getAccessToken(req);

    if (accessToken) {
        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json();

        const guildResponse = await fetch(`http://discordapp.com/api/guilds/${req.params.guildID}`, {
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

        var guildInfo = await getGuildInfo(req.params.guildID);

        if (guildInfo[0]) {
            const channelsResponse = await fetch(`http://discordapp.com/api/guilds/${req.params.guildID}/channels`, {
                method: 'GET',
                headers: {
                    Authorization: `Bot ${BOT_TOKEN}`,
                },
            });
            const channels = await channelsResponse.json();

            if (req.params.module == "verification") {
                var VerifyModule = JSON.parse(escapeSpecialChars(guildInfo[0].VerifyModule));


                res.render('verify-module', {
                    loggedIn: true,
                    userInfo: userInfo,
                    moduleSettings: VerifyModule,
                    guild: guild,
                    channels: channels,
                    host: req.get('host'),
                    protocol: req.protocol,
                })
            }
        } else {
            res.redirect('/dashboard')
        }
    } else {
        res.redirect('/login')
    }
}))

app.get('/about', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    if (accessToken) {

        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()
        res.render('about', {
            loggedIn: true,
            userInfo: userInfo,
            servers: client.guilds.array().length.toString(),
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.render('about', {
            loggedIn: false,
            host: req.get('host'),
            protocol: req.protocol,
        });
    }
}))

app.get('/features', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    if (accessToken) {

        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()
        res.render('features', {
            loggedIn: true,
            userInfo: userInfo,
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.render('features', {
            loggedIn: false,
            host: req.get('host'),
            protocol: req.protocol,
        });
    }
}))

app.get('/commands', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    if (accessToken) {

        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()
        res.render('commands', {
            loggedIn: true,
            userInfo: userInfo,
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.render('commands', {
            loggedIn: false,
            host: req.get('host'),
            protocol: req.protocol,
        });
    }
}))

app.get('/dashboard', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req)

    if (accessToken) {

        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()


        const guildsResponse = await fetch(`http://discordapp.com/api/users/@me/guilds`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const guilds = await guildsResponse.json();

        const botGuilds = client.guilds.array();
        const admin = [];
        for (var i = 0; i < guilds.length; i++) {
            var permission = guilds[i].permissions;
            if ((permission & 0x8) == 0x8) {
                const userGuilds = botGuilds.filter(function(object) {
                    return object.id == guilds[i].id;
                })

                if (userGuilds[0]) {
                    guilds[i].botGuild = true;
                } else {
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
            return b.botGuild - a.botGuild
        })
        res.render('servers', {
            loggedIn: true,
            userInfo: userInfo,
            guilds: result,
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.redirect('login')
    }
}));

app.get('/profile', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    if (accessToken) {
        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()

        const profileInfo = await getProfile(userInfo.id);
        var profile = JSON.parse(escapeSpecialChars(profileInfo.profile));

        res.render('profile', {
            profileOwner: true,
            profile: profile,
            loggedIn: true,
            userInfo: userInfo,
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.redirect('/login');
    }
}));

app.get('/profile/:userID', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    const profileInfo = await getProfile(req.params.userID);

    if (!profileInfo)
    {
        res.redirect('/home');
        return;
    }

    var profile = JSON.parse(escapeSpecialChars(profileInfo.profile));

    if (accessToken) {
        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()

        if(userInfo.id == profile.userID)
        {
            var profileOwner = true;
        }
        else
        {
            var profileOwner = false;
        }

        res.render('profile', {
            profileOwner: profileOwner,
            profile: profile,
            loggedIn: true,
            userInfo: userInfo,
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.render('profile', {
            profileOwner: false,
            profile: profile,
            loggedIn: false,
            host: req.get('host'),
            protocol: req.protocol,
    })
    }
}));


app.get('/profile/:userID/edit', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    if (accessToken) {
        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()

        const profileInfo = await getProfile(req.params.userID);
        var profile = JSON.parse(escapeSpecialChars(profileInfo.profile));

        res.render('edit-profile', {
            profileOwner: true,
            profile: profile,
            loggedIn: true,
            userInfo: userInfo,
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.redirect('/login');
    }
}));

app.get('/invite-bot', catchAsync(async(req, res) => {
    res.redirect('https://discordapp.com/api/oauth2/authorize?client_id=672548437346222110&permissions=8&redirect_uri=http%3A%2F%2Fwww.autumnbot.net%2Fhome&scope=bot');
}));

app.get('/support', catchAsync(async(req, res) => {
    res.redirect('https://discord.gg/DfByvyN');
}));

app.get('/home', catchAsync(async(req, res) => {
    const accessToken = await getAccessToken(req);

    if (accessToken) {

        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json()
        res.render('home', {
            loggedIn: true,
            userInfo: userInfo,
            servers: client.guilds.array().length.toString(),
            users: client.users.array().length.toString(),
            channels: client.channels.array().length.toString(),
            host: req.get('host'),
            protocol: req.protocol,
        });
    } else {
        res.render('home', {
            loggedIn: false,
            servers: client.guilds.array().length.toString(),
            users: client.users.array().length.toString(),
            channels: client.channels.array().length.toString(),
            host: req.get('host'),
            protocol: req.protocol,
        });
    }
}));

app.use(function(req, res, next) {
    res.render('404', {
        host: req.get('host'),
        protocol: req.protocol,
    })
});