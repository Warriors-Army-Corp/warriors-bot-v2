const Discord = require('discord.js'); //appeler la bibliothèque discord
const client = new Discord.Client(); //création du client
client.commands = new Discord.Collection(); //création d'une collection pour répertorier les commandes

const fs = require('fs'); //pour les commands handler

//modification de la class GuildMember
Discord.Structures.extend('GuildMember', GuildMember => {
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
});

//constantes à utiliser partout dans le programme du bot
client.PREFIX = "w?";
client.MARQUE = "Warriors Bot official";
client.THUMB = "https://cdn.discordapp.com/emojis/594149233246863380.png";
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



client.login(process.env.TOKEN); //connexion
client.on('error', console.error); //affichage des erreurs Discord dans la console
client.on('warn', console.warn); //affichage des warns Discord dans la console
