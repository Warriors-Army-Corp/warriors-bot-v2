const Discord = require('discord.js'); //appeler la bibliothèque discord
const client = new Discord.Client(); //création du client
client.commands = new Discord.Collection(); //création d'une collection pour répertorier les commandes
const { TOKEN } = require('../config'); //token stocké dans un autre fichier

//constantes à utiliser partout dans le programme du bot
client.PREFIX = "w?";
client.MARQUE = "Warriors' Bot official";
client.THUMB = "https://cdn.discordapp.com/emojis/594149233246863380.png";

//appel des commandes
client.commands.set(`help`, require("../commands/help.js"));
client.commands.set(`clear`, require("../commands/clear.js"));
client.commands.set(`roleinfo`, require("../commands/roleInfo.js"));
client.commands.set(`servinfo`, require("../commands/servInfo.js"));
client.commands.set(`userinfo`, require("../commands/userInfo.js"));
// client.commands.set(`roulette`, require("../commands/roulette.js"));
client.commands.set(`ban`, require("../commands/ban.js"));

//appel des events
client.on('ready', () => require('../events/ready.js')(client));
client.on('message', msg => require('../events/messages.js')(client, msg));

client.login(TOKEN); //connexion
client.on('error', console.error); //affichage des erreurs Discord dans la console
client.on('warn', console.warn); //affichage des warns Discord dans la console
