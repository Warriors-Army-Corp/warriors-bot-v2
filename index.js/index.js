const { Client, Collection, Structures } = require('discord.js'); //appeler la bibliothèque discord
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); //création du client
client.commands = new Collection(); //création d'une collection pour répertorier les commandes

const fs = require('fs'); //pour les commands handler

//modification de la class GuildMember
Structures.extend('GuildMember', GuildMember => {
  class GuildMemberV2 extends GuildMember {
    pending = false;

    constructor(client, data, guild) {
      super(client, data, guild);
      this.pending = data.pending;
    }

    _patch(data) {
        super._patch(data);
        this.pending = data.pending;
    }
  }

  return GuildMemberV2;
})

//constantes à utiliser partout dans le programme du bot
client.PREFIX = "w?";
client.MARQUE = "Warriors Bot official";
client.THUMB = "https://cdn.discordapp.com/emojis/823254034654822401.png";
//pour la roulette
client.ROULETTE = 6;

//appel des commandes
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //lire les fichiers dans le dossier commands
for(const file of cmdFiles){
  const cmd = require(`../commands/${file}`); //récupère le fichier
  client.commands.set(cmd.help.cmd.toLowerCase(), cmd); //stack le fichier dans la collection
}

//appel des events
client.on('ready', () => require('../events/ready.js')(client));
client.on('message', msg => require('../events/messages.js')(client, msg));
client.on('guildMemberUpdate', (oldMember, newMember) => require('../events/guildMemberUpdate.js')(oldMember, newMember));
client.on('messageReactionAdd', (messageReaction, user) => require('../events/messageReactionAdd.js')(messageReaction, user));
client.on('messageReactionRemove', (messageReaction, user) => require('../events/messageReactionRemove.js')(messageReaction, user));
client.on('guildCreate', guild => require('../events/guildCreate.js')(client, guild));
client.on('guildDelete', guild => require('../events/guildDelete.js')(client, guild));

client.login(process.env.TOKEN); //connexion
client.on('error', console.error); //affichage des erreurs Discord dans la console
client.on('warn', console.warn); //affichage des warns Discord dans la console
