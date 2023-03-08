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

b1_1138.login("NzM1Nzk4MzE3NDgwNDExMTM3.G4mSUv.4id62kAsBSBe2QC7182yzWMH8TCrZr-yrSj-yg");
b3_10.login("MTA4MjI5MDIwOTkyMTY5NTkxNA.GVwIUa.ZOl8mgLuduo-0FGBCOtZJN_Itptd86IcLwqsAs");
b3_1204.login("MTA4MjI5MDgxMTU3Nzg0Nzg4OQ.GDq1AF.pXDy9pvX0TIU9NJt35qPThLNFevzpCwi3kR4QU");
b3_21.login("MTA4MjI5MTg4OTg3MDQ3OTQ4MA.G1TW59.6l06x7trvokryJyRQ9T8TMp89oiPBjL817SU2Y");
b3_888.login("MTA4MjI5MjI5NTAxOTI3ODQxNg.GwxpD3.VazvUfDz4-2ICrzkUsLWs6hsufat3K0FpjDMK0");
ex7.login("MTA4MjI5NjMxMDY4Nzg2Njk3MQ.G8ePPh.EnLCgKc6NH85aYgO-mpSIxR8muDE78iiIu8NJ8");
ex8.login("MTA4MjI5NzY2NzM3NzQzNDY3NQ.Gl4SY0.rrCcTrCV1UguEA_NDB_l6WQUEe2WVO3tRaG13U");
