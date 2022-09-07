/*
 * author : Mizari (Mizari-W)
 */
// importation des packages et fonctions dont on a besoin
const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const date = require('../../fonctions/date.js');
const badges = require('../../fonctions/getServBadges.js');


module.exports = {
  name: "server-infos",
  description: "Show some informations about this server.",
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    const guild = interaction.guild; // récupération du serv
    const allChan = guild.channels.cache; // récupération de tous les salons

    // initialisation de l'embed
    var servEmbed = new EmbedBuilder({
      title: `Infos sur le serveur ${guild.name}`,
      thumbnail: {
        url: guild.iconURL({dynamic: true})
      },
      color: "#2F3136",
      fields:[
        {
          name: "Owner",
          value: `${guild.members.cache.get(guild.ownerId)}`,
          inline: true
        },
        {
          name: "ID",
          value: `${guild.id}`,
          inline: true
        },
        {
          name: "Création",
          value: `${date(guild.createdAt)}`,
          inline: true
        },
        {
          name: "Membres",
          value: `Totale : ${guild.memberCount}\n${guild.members.cache.filter(mbr => mbr.presence && mbr.presence.status === "online").size} online\n${guild.members.cache.filter(mbr => !mbr.user.bot).size} humains et ${guild.members.cache.filter(mbr => mbr.user.bot).size} bots`,
          inline: true
        },
        {
          name: "Salons",
          value: `Totale : ${allChan.size}\n${allChan.filter(ch => ch.type === "GUILD_CATEGORY" || ch.type === "GUILD_STORE" || ch.type === "UNKNOWN").size} spéciaux\n${allChan.filter(ch => ch.type === "GUILD_TEXT" || ch.type === "GUILD_NEWS" || ch.type === "GUILD_NEWS_THREAD" || ch.type === "GUILD_PUBLIC_THREAD" || ch.type === "GUILD_PRIVATE_THREAD").size} textuels et ${allChan.filter(ch => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size} vocaux`,
          inline: true
        },
        {
          name: "Badges",
          value: `${badges(guild)}`
        }
      ]
    });

    if (guild.banner) {
      servEmbed.setImage(guild.bannerURL({format: "png", size: 4096}));
    }

    if (guild.description) {
      servEmbed.setDescription(guild.description);
    }

    interaction.deleteReply();
    interaction.channel.send({ embeds: [servEmbed] });
  }
}
