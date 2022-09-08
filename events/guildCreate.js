const colors = require('../fonctions/colors.js');
const client = require("../index");
const { ActivityType } = require("discord.js");

client.on("guildCreate", async (guild) => {
  client.user.setActivity(`${client.guilds.cache.size} servers`, {type: ActivityType.Competing});

  // mise en page des logs dans la console (ça c'est pour Mizari)
  console.log(`[${colors.FgGreen}    Serv    ${colors.Reset}]\tNew serv : ${guild.name}`);
  console.log(`\t\tNombre de membres : ${guild.memberCount}`);
  console.log(`\t\tOwner : ${guild.members.cache.get(guild.ownerId).user.username}`);
});
