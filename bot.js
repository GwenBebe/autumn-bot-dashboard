const Discord = require('discord.js');

const client = new Discord.Client();

const BOT_TOKEN = "";

client.login(BOT_TOKEN);

console.log("BOT CONNECTED");

module.exports = client;
