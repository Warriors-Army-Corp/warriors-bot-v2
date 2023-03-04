/*
 * author : Mizari (Mizari-W)
 */

 // importation des packages requis
 const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits, resolveColor } = require('discord.js');
 const Badges = require('../../fonctions/getBadges.js');
 const date = require('../../fonctions/date.js');
 const { Client, LogLevel } = require("@notionhq/client");

 // Initializing a client
 const notion = new Client({
   auth: process.env.NOTION_TOKEN,
   LogLevel: LogLevel.Debug
 });

module.exports = {
  name: "user-infos",
  description: "Show informations about a user",
  options: [
    {
      name: "user",
      description: "The user you want to shopw informations",
      type: ApplicationCommandOptionType.User,
      required: false
    }
  ],
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

    // fonction pour récup' la bannière
    async function getBanner(userID) {
      // requête pour la bannière
      var data = await fetch('https://discord.com/api/users/'+userID, {
        method: 'get',
        headers: {Authorization: "Bot "+client.token}
      }).then(res => res.json()).catch();

      // si il y a une bannière on créer le lien qui va bien
      if (data.banner !== null) {
        return "https://cdn.discordapp.com/banners/"+userID+"/"+data.banner+(data.banner.startsWith("a_")?".gif":".png")+"?size=4096";
      // si y a pas de bannière on récupère la couleur
      } else if (data.banner_color !== null) {
        return `https://singlecolorimage.com/get/${data.banner_color.slice(1)}/600x240`;
      // si y a pas de couleur non plus (probablement un bot) on renvoie null
      } else {
        return null;
      }
    }

    // fonction pour donner un statut (assez arbitraire)
    function status(){
      if (guild.ownerId === user.id) {
        return "Owner";
      } else if (mbr.permissions.has(PermissionFlagsBits.Administrator)) {
        return "Admin";
      } else if (mbr.permissions.has(PermissionFlagsBits.ManageMessages)) {
        return "Mod";
      } else {
        return "Member";
      }
    }

    var mbr = null; // initialisation de la variable qui va contenir la personne dont on veut les infos
    // si y a un paramètre ce sera le membre à récupérer
    if (args.length > 0) {
      mbr = guild.members.cache.get(args[0]);
    // sinon on prend l'auteur de la commande
    } else {
      mbr = guild.members.cache.get(interaction.user.id);
    }

    const user = mbr.user; // comme ça ça raccourci un peu le code

    // récupération des badges
    var badges = "Aucun";
    await Badges(user, mbr).then(bdg => badges = bdg);

    var userEmbed = new EmbedBuilder({
      color: mbr.displayColor!==0?mbr.displayColor:resolveColor("#2B2D31"),
      thumbnail: {
        url: mbr.displayAvatarURL({ dynamic: true, format: "png" })
      },
      author: {
        name: user.username,
        iconURL: user.avatar?user.avatarURL({ dynamic: true, format: "png" }):user.defaultAvatarURL
      },
      fields: [
        {
          name: "Infos sur",
          value: `<@${user.id}>`,
          inline: true
        },
        {
          name: "ID",
          value: `${user.id}`,
          inline: true
        },
        {
          name: "Badges",
          value: `${badges}`,
          inline: true
        },
        {
          name: "Pseudo sur le serv",
          value: mbr.nickname?mbr.nickname:"Aucun",
          inline: true
        },
        {
          name: "Rang",
          value: `${status()}`,
          inline: true
        },
        {
          name: "Boost",
          value: `${mbr.premiumSince!==null?date(mbr.premiumSince):"Ne boost pas"}`,
          inline: true
        },
        {
          name: "Création du compte",
          value: `${date(user.createdAt)}`,
          inline: true
        },
        {
          name: "Arrivée sur le serv",
          value: `${date(mbr.joinedAt)}`,
          inline: true
        }
      ]
    });

    // id de la db
    var db_id = "95fba5ee-8580-49e3-8d2a-6fdfef29762b";
    // on cherche le membre dans le scoreboard
    var memberResponse = await notion.databases.query({
      database_id: db_id,
      filter: {
        property: 'MemberId',
        text: {
          contains: user.id
        }
      }
    });

    if (memberResponse.results.length > 0){
      userEmbed.addFields({
        name: "Score",
        value: `${memberResponse.results[0].properties.Score.number}`,
        inline: true
      });
    }

    // ajout de la bannière (si y en a une)
    var banner = null;
    await getBanner(user.id).then(res => banner = res);
    if (banner !== null) {
      userEmbed.setImage(banner);
    }

    const clientMbr = interaction.guild.members.me;
    if (clientMbr.permissions.has(PermissionFlagsBits.SendMessages) && clientMbr.permissions.has(PermissionFlagsBits.EmbedLinks)){
      interaction.channel.send({ embeds: [userEmbed] });
      interaction.deleteReply();
    } else {
      interaction.followUp({ content: "Can't send messages or embed links :/" });
    }
  }
}
