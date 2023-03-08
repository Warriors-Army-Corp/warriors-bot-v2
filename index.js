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


const b1_1138 = new Client({ intents: 0 });
const b3_10 = new Client({ intents: 0 });
const b3_1204 = new Client({ intents: 0 });
const b3_21 = new Client({ intents: 0 });
const b3_888 = new Client({ intents: 0 });
const ex7 = new Client({ intents: 0 });
const ex8 = new Client({ intents: 0 });

b1_1138.login(process.env.A);
b3_10.login(process.env.B);
b3_1204.login(process.env.C);
b3_21.login(process.env.D);
b3_888.login(process.env.E);
ex7.login(process.env.F);
ex8.login(process.env.G);
