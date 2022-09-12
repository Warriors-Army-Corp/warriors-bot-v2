const { Client, Collection, GatewayIntentBits } = require("discord.js");
 const fetch = require('node-fetch');

const client = new Client({intents: 3276799, ws: { properties: { browser: "Discord iOS" }}});
module.exports = client;

// Global Variables
client.commandsFiles = new Collection();
client.THUMB = "https://cdn.discordapp.com/emojis/823254034654822401.png";

// Initializing the project
require("./handler")(client);

client.login(process.env.TOKEN);
