const express = require('express');
const fetch = require('node-fetch');
const btoa = require('btoa');
const {
    catchAsync
} = require('../utils');
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');
const {
    check,
    validationResult
} = require('express-validator');
const axios = require('axios')
var con = require(__dirname + '/../db.js');
var client = require(__dirname + '/../bot.js');

var router = express.Router();

router.use(requestIp.mw());

//-----------------------------
//       \\ Functions //      |
//-----------------------------

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

function getUserInfo(ip) {
    return new Promise((resolve, reject) => {
        con.query(
            "SELECT * FROM dashboardlogins WHERE userIP = '" + ip + "' LIMIT 1",
            (err, result) => {
                return err ? reject(err) : resolve(result[0]);
            })
    })
}

function escapeSpecialChars(jsonString) {
    return jsonString
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")
        .replace(/\f/g, "\\f");

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

function setGuildInfo(value, id, column) {
    con.query(
        "UPDATE guildsettings SET " + column + " = '" + value + "' WHERE Guild = '" + id + "'",
        (err, result) => {
          if(err) throw err;
            console.log("Updated " + result.affectedRows + " row(s)");
        })
}

function setProfile(id, profile) {
    con.query(
        "UPDATE profiles SET profile = '" + profile + "' WHERE userID = '" + id + "'",
        (err, result) => {
          if(err) throw err;
            console.log("Updated " + result.affectedRows + " row(s)");
        })
}

function deleteUserInfo(ip) {
    con.query(
        "DELETE FROM dashboardlogins WHERE userIP = '" + ip + "'",
        (err, result) => {
            console.log("Deleted " + result.affectedRows + " row(s)")
        })
}

//----------------------------------
//       \\ Router Methods //      |
//----------------------------------

router.post('/update/:module/:guildID', catchAsync(async function(req, res) {
    const accessToken = await getAccessToken(req);

    console.log(req.body);

    if (accessToken) {

        const response = await fetch(`http://discordapp.com/api/users/@me`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userInfo = await response.json();

        console.log(userInfo.username + " Logged In");
        
        if (req.body.module == "verification") {
            if (req.body.VerifiedRoleEnabled == "true")
            {
                var VerifiedRoleEnabled = true;
            }else
            {
                var VerifiedRoleEnabled = false;
            }
            if(req.body.enabled == "true")
            {
                var enabled = true;
            }
            else
            {
                var enabled = false;
            }
            
            var verifyModuleOBJ = {
                enabled: enabled,
                VerifyChannel: req.body.VerifyChannel,
                MVChannel: req.body.MVChannel,
                StaffRole: req.body.StaffRole,
                NonVerifiedRole: req.body.NonVerifiedRole,
                VerifiedRole: req.body.VerifiedRole,
                VerifiedRoleEnabled: VerifiedRoleEnabled,
                VMessage: req.body.VMessage,
            }


            axios
            .post(`http://bot.autumnbot.net/api/update/${req.params.guildID}/verification`, verifyModuleOBJ)
            .then(res => {
            console.log("RES: " + res.data)
            })
            .catch(error => {
            console.error(error)
            })

            var final = JSON.stringify(verifyModuleOBJ);

            var a = 0;
            var count = 0;
            for (a = 0; a < JSON.stringify(verifyModuleOBJ).length; a++) {
                if (JSON.stringify(verifyModuleOBJ).charAt(a) == "'") {
                    final = [final.slice(0, a + count), '\\', final.slice(a + count)].join('');
                    count++;

                }
            }
            const guildID = req.params.guildID;

            const oldGuildInfo = await getGuildInfo(guildID);

            var guild = client.guilds.get(guildID);

            let channels = guild.channels.array();

            let modChan = guild.channels.get(verifyModuleOBJ.MVChannel);

            let verifyChan = guild.channels.get(verifyModuleOBJ.VerifyChannel);

            let oldStaffRole = guild.roles.get(oldGuildInfo.StaffRole);

            let oldNonVerifiedRole = guild.roles.get(oldGuildInfo.NonVerifiedRole);

            let oldNonVerifyChan = guild.roles.get(oldGuildInfo.VerifyChannel);

            if(oldStaffRole){
                modChan.overwritePermissions(oldStaffRole.id, {
                    VIEW_CHANNEL: null,
                    ADD_REACTIONS: null,
                    SEND_MESSAGES: null
                });
            }

            if(verifyModuleOBJ.enabled){
                for(var i = 0; i < channels.length; i++){
                    const channel = guild.channels.get(channels[i].id);

                    if(oldNonVerifiedRole){
                        channel.overwritePermissions(oldNonVerifiedRole.id, {
                          VIEW_CHANNEL: null,
                        });
                    }
        
                    if(channel.id != verifyModuleOBJ.VerifyChannel){channel.overwritePermissions(verifyModuleOBJ.NonVerifiedRole, {
                      VIEW_CHANNEL: false,
                    })}

                    console.log("Updated " + channel.name)
                }
            }

            modChan.overwritePermissions(guild.defaultRole.id, {
                VIEW_CHANNEL: false
            });


            modChan.overwritePermissions(verifyModuleOBJ.StaffRole, {
                VIEW_CHANNEL: true,
                ADD_REACTIONS: false,
                SEND_MESSAGES: false
            });

            verifyChan.overwritePermissions(guild.defaultRole.id, {
                VIEW_CHANNEL: false,
            });

            verifyChan.overwritePermissions(verifyModuleOBJ.NonVerifiedRole, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            });


            console.log("GuildID: " + guildID);

            res.send("Saved!");

            setGuildInfo(final, guildID, "VerifyModule");

        }if(req.body.module == "profile")
        {
            const response = await fetch(`http://discordapp.com/api/users/@me`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const userInfo = await response.json();

            var profileOBJ = {
                userID: userInfo.id,
                username: userInfo.username,
                tag: userInfo.discriminator,
                avatar: userInfo.avatar,
                color: req.body.color,
                pronouns: req.body.pronouns,
                gender: req.body.gender,
                age: req.body.age,
                biography: req.body.biography,
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

            console.log(final);

            res.send("Saved!");

            setProfile(userInfo.id, final);
        }

    } else {
        console.log("ERR: NOT LOGGED IN");
        res.send("ERR: NOT_LOGGED_IN");
    }
}));

module.exports = router;