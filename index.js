const { Client, Collection, GatewayIntentBits } = require("discord.js");
 const fetch = require('node-fetch');

const client = new Client({intents: 3276799});
module.exports = client;

// Global Variables
client.slashCommands = new Collection();
client.THUMB = "https://cdn.discordapp.com/emojis/823254034654822401.png";

// Initializing the project
require("./handler")(client);

// client.on("ready", async function () {
//     client.user.presence.set({ client_status: { mobile: "online" } });
//   //fetch('https://discord.com/api/v10/users/@me/guilds', {
//   //  method: 'get',
//   //  //body:    JSON.stringify(body),
//   //  headers: {
//   //    'Authorization': `Bot ${process.env.TOKEN}`,
//   //    'Content-Type': 'application/json'
//   //  }
//   //})
//   //.then(res => res.json())
//   //.then(guilds => {
//   //  guilds.forEach(guild => {
//   //    fetch(`https://discord.com/api/v10/applications/${client.user.id}/guilds/${guild.id}/commands`, {
//   //      method: 'put',
//   //      body:    "[]",
//   //      headers: {
//   //        'Authorization': `Bot ${process.env.TOKEN}`,
//   //        'Content-Type': 'application/json'
//   //      }
//   //    })
//   //    .then(res => res.json())
//   //    .then(json => console.log(json));
//   //  });
//
//   //});
// });

client.login(process.env.TOKEN);
