const fetch = require('node-fetch');
const checkGuild = require('../fonctions/checkGuildDB.js');
const colors = require('../fonctions/colors.js');

module.exports = async (client) => {
  console.log(`[${colors.FgCyan} Connected  ${colors.Reset}] Logged in as ${client.user.tag}!`); //affichage dans la console que le client est bien co (c'est pour Mizari)
  client.user.setActivity(`${client.guilds.cache.size} servers | ${client.PREFIX}help`, {type: 'COMPETING'}); //affiche sur combien de serv est le bot

  await client.application.commands.set(client.arraySlashCommands);
  //guilds.cache.get("645239930896908293")
}
