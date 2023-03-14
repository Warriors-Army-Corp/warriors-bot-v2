const client = require("../index");
const colors = require('../fonctions/colors.js');
const { ActivityType, ApplicationCommandType } = require("discord.js");

client.on("ready", () => {
   console.log(`[${colors.FgGreen} Connected  ${colors.Reset}]\t✅ Logged in as ${client.user.tag}!`);
   client.user.setActivity(`${client.guilds.cache.size} servers`, {type: ActivityType.Competing});

   //console.log(client.guilds.cache.get("706640777450881114").channels.cache.get("1078322593871974471").availableTags);
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
