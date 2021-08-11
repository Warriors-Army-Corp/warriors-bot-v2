const { Client, Collection, Structures, Intents } = require('discord.js'); //appeler la bibliothèque discord
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBERS'],
  intents: new Intents().add('GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS', 'GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'),
  allowedMentions: {
    parse: ['users', 'roles', 'everyone'],
    repliedUser: false
  }
}); //création du client
client.commands = new Collection(); //création d'une collection pour répertorier les commandes
client.slashCommands = new Collection(); //création d'une collection pour répertorier les slashCommands
client.arraySlashCommands = []; //liste des salsh commands pour les créer après

const fs = require('fs'); //pour les commands handler

//constantes à utiliser partout dans le programme du bot
// client.PREFIX = "w/";
client.MARQUE = "Warriors Bot official";
client.THUMB = "https://cdn.discordapp.com/emojis/823254034654822401.png";

//appel des commandes
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //lire les fichiers dans le dossier commands
for(const file of cmdFiles){
  const cmd = require(`../commands/${file}`); //récupère le fichier
  client.commands.set(cmd.help.cmd.toLowerCase(), cmd); //stack le fichier dans la collection
}

//appel des slashCommands
const slashFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js')); //lire les fichiers dans le dossier slash
for(const file of slashFiles){
  const cmd = require(`../slash/${file}`); //récupère le fichier
  client.slashCommands.set(cmd.name.toLowerCase(), cmd); //stack le fichier dans la collection
  client.arraySlashCommands.push(cmd);
}

//appel des events
client.on('ready', () => require('../events/ready.js')(client));
// client.on('messageCreate', msg => require('../events/messages.js')(client, msg));
// client.on('interactionCreate', interaction => require('../events/interaction.js')(client, interaction));
client.on('guildMemberUpdate', (oldMember, newMember) => require('../events/guildMemberUpdate.js')(oldMember, newMember));
client.on('messageReactionAdd', (messageReaction, user) => require('../events/messageReactionAdd.js')(messageReaction, user));
client.on('messageReactionRemove', (messageReaction, user) => require('../events/messageReactionRemove.js')(messageReaction, user));
client.on('guildCreate', guild => require('../events/guildCreate.js')(client, guild));
client.on('guildDelete', guild => require('../events/guildDelete.js')(client, guild));

client.login(process.env.TOKEN); //connexion
client.on('error', console.error); //affichage des erreurs Discord dans la console
client.on('warn', console.warn); //affichage des warns Discord dans la console

/*
                           ^
                          /|\
                         / | \
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                         | | |
                   /|    |_|_|    |\
                   \ \___/ W \___/ /
                    \_____ _ _____/
                          |-|
                          |-|
                          |-|
                         .'-'.
                         '---'
*/
