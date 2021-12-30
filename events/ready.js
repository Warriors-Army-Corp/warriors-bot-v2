const client = require("../index");
const colors = require('../fonctions/colors.js');

client.on("ready", () => {
   console.log(`[${colors.FgGreen} Connected  ${colors.Reset}]\tLogged in as ${client.user.tag}!`);

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
