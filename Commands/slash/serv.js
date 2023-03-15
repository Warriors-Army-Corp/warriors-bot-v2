/*
 * author : Mizari (Mizari-W)
 */
// importation des packages et fonctions dont on a besoin
const { EmbedBuilder, ApplicationCommandType, ChannelType, resolveColor } = require('discord.js');
const date = require('../../fonctions/date.js');
const badges = require('../../fonctions/getServBadges.js');
const { Client, LogLevel } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});


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
    var embeds = [];

    // initialisation de l'embed
    var servEmbed = new EmbedBuilder({
      title: `Infos sur le serveur ${guild.name}`,
      thumbnail: {
        url: guild.iconURL({dynamic: true})
      },
      color: resolveColor("#2B2D31"),
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
          value: `Total : ${guild.memberCount}\n${guild.members.cache.filter(mbr => mbr.presence && mbr.presence.status !== "offline").size} online\n${guild.members.cache.filter(mbr => !mbr.user.bot).size} humains et ${guild.members.cache.filter(mbr => mbr.user.bot).size} bots`,
          inline: true
        },
        {
          name: "Salons",
          value: `Total : ${allChan.size}\n${allChan.filter(ch => ch.type === ChannelType.GuildCategory || ch.type === ChannelType.GuildForum).size} spéciaux\n${allChan.filter(ch => ch.type === ChannelType.GuildText || ch.type === ChannelType.GuildAnnouncement || ch.type === ChannelType.AnnouncementThread || ch.type === ChannelType.PublicThread || ch.type === ChannelType.PrivateThread).size} textuels et ${allChan.filter(ch => ch.type === ChannelType.GuildVoice || ch.type === ChannelType.GuildStageVoice).size} vocaux`,
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

    embeds.push(servEmbed);

    if (guild.id === "706640777450881114"){
      // id de la db
      var db_id = "95fba5ee-8580-49e3-8d2a-6fdfef29762b";
      // on cherche le membre dans le scoreboard
      var memberResponse = await notion.databases.query({
        database_id: db_id,
        sorts: [
          {
            property: "Score",
            direction: "descending"
          }
        ]
      });

      if (memberResponse.results.length > 0){
        var listMember = "";
        for (var i = 0; i < memberResponse.results.length; i++) {
          var scoreboardmbr = guild.members.cache.get(memberResponse.results[i].properties.MemberId.title[0].plain_text);
          if (scoreboardmbr != undefined)
            listMember += scoreboardmbr.user.username+" -> "+memberResponse.results[i].properties.Score.number+" points\n";
        }
        var scoreEmbed = new EmbedBuilder({
          title: "Score Board",
          color: resolveColor("#2B2D31"),
          description: listMember
        });

        embeds.push(scoreEmbed);
      }
    }

    interaction.deleteReply();
    interaction.channel.send({ embeds: embeds });
  }
}
