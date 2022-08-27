/*
 * author : Mizari (Mizari-W)
 */

 // importation des packages dont on a besoin
 const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "url-in-gif",
  description: "Put a URL in a gif",
  options: [
    {
      name: "url",
      description: "The URL to put in the gif",
      type: "STRING",
      required: true
    },
    {
      name: "gif",
      description: "The gif that'll contain the URL",
      type: "STRING",
      required: false
    }
  ],
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    // l'url à save est le premier argument
    var url = args[0];
    // initialisation de la variable qui va contenir (peut être) le gif
    var gif = null;

    if (args.length > 1) {
      gif = args[1];
    }

    // on créé l'embed
    var embed = new MessageEmbed({
      description: "Mettez le gif en favori, puis envoyez le gif dans n'importe quel salon",
      url: url,
      image: {
        url: gif!==null?gif:"https://media.discordapp.net/attachments/586232536934645790/823251570853543947/W.A.C-PP-withoutloop.gif"
      },
      color: "#2F3136"
    });

    // on envoit l'embed (si l'argument n'était pas une URL ça génère une erreur, du coup on engueule le user)
    interaction.followUp({ embeds: [embed] }).catch(() => interaction.followUp({ content: "Vous devez me donner une URL ou un gif valide et rien d'autre" }));
  }
}
