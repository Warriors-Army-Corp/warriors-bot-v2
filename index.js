const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.slashCommands = new Collection();
client.THUMB = "https://cdn.discordapp.com/emojis/823254034654822401.png";

// Initializing the project
require("./handler")(client);

client.login(process.env.TOKEN);
