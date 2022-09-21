const client = require("../index");
const colors = require('../fonctions/colors.js');
const { ActivityType } = require("discord.js");

client.on("ready", () => {
   console.log(`[${colors.FgGreen} Connected  ${colors.Reset}]\t✅ Logged in as ${client.user.tag}!`);
   client.user.setActivity(`${client.guilds.cache.size} servers`, {type: ActivityType.Competing});

   // Pour tout delete (normalement ça marche)
   // client.application.commands.cache.each(cmd => {
   //   console.log(cmd.name);
   //   cmd.delete().then(cmd => console.log("deleted"));
   // });
   // client.guilds.cache.each(guild => {
   //   console.log(guild.name);
   //   guild.commands.cache.each(cmd =>{
   //     console.log(cmd.name);
   //     cmd.delete().then(cmd => console.log("deleted"));
   //   });
   // });
});
