const fetch = require('node-fetch');
const checkGuild = require('../fonctions/checkGuildDB.js');
const colors = require('../fonctions/colors.js');

module.exports = async (client) => {
  console.log(`[${colors.FgCyan} Connected  ${colors.Reset}] Logged in as ${client.user.tag}!`); //affichage dans la console que le client est bien co (c'est pour Mizari)
  client.user.setActivity(`${client.guilds.cache.size} servers | use "/"`, {type: 'COMPETING'}); //affiche sur combien de serv est le bot

  await client.guilds.cache.each(guild => guild.commands.set(client.arraySlashCommands));

}
