const colors = require('../fonctions/colors.js');

module.exports = (client, guild) => {
  client.user.setActivity(`${client.guilds.cache.size} servers | ${client.PREFIX}help`, {type: 'COMPETING'});
  // mise en page des logs dans la console (ça c'est pour Mizari)
  console.log(`[${colors.FgGreen}    Logs    ${colors.Reset}] Nouveau serv : ${guild.name}`);
  console.log(`               Nombre de membres : ${guild.memberCount}`);
  console.log(`               Owner : ${guild.members.cache.get(guild.ownerId).user.username}`);
}
