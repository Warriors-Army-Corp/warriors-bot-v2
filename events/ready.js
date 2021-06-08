const fetch = require('node-fetch');
const checkGuild = require('../fonctions/checkGuildDB.js');

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`); //affichage dans la console que le client est bien co (c'est pour Mizari)
  client.user.setActivity(`${client.guilds.cache.size} servers`, {type: 'COMPETING'}); //affiche sur combien de serv est le bot

}
