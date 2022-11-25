/*
 * author : Mizari (Mizari-W)
 */
// importation des packages et fonctions dont on a besoin
const { EmbedBuilder, ApplicationCommandType, ChannelType } = require('discord.js');
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
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const guild = interaction.guild; // récupération du serv
    const allChan = guild.channels.cache; // récupération de tous les salons

    // initialisation de l'embed
    var servEmbed = new EmbedBuilder({
      title: `Infos sur le serveur ${guild.name}`,
      thumbnail: {
        url: guild.iconURL({dynamic: true})
      },
      color: parseInt("2F3136", 16),
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
          value: `Totale : ${allChan.size}\n${allChan.filter(ch => ch.type === ChannelType.GuildCategory || ch.type === ChannelType.GuildForum).size} spéciaux\n${allChan.filter(ch => ch.type === ChannelType.GuildText || ch.type === ChannelType.GuildAnnouncement || ch.type === ChannelType.AnnouncementThread || ch.type === ChannelType.PublicThread || ch.type === ChannelType.PrivateThread).size} textuels et ${allChan.filter(ch => ch.type === ChannelType.GuildVoice || ch.type === ChannelType.GuildStageVoice).size} vocaux`,
          inline: true
        },
        {
          name: "Badges",
          value: `${badges(guild)}`
        }
      ]
    });

    if (guild.banner) {
      servEmbed.setImage(guild.bannerURL({format: "png", size: 4096, dynamic: true}));
    }

    if (guild.description) {
      servEmbed.setDescription(guild.description);
    }

    interaction.deleteReply();
    interaction.channel.send({ embeds: [servEmbed] });
  }
}
