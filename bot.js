const Discord = require('discord.js');

const client = new Discord.Client();

const BOT_TOKEN = "NjcyNTQ4NDM3MzQ2MjIyMTEw.XlqgFw.kmBSFsir4CYtj26HHuI7UeJySjc";

client.login(BOT_TOKEN);

console.log("BOT CONNECTED");

module.exports = client;