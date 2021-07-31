/*
 * author : Mizari (Mizari-W)
 */

 // importation des packages requis
 const { MessageEmbed } = require('discord.js');
 const fetch = require('node-fetch');
 const Badges = require('../fonctions/getBadges.js');
 const date = require('../fonctions/date.js');

module.exports = {
  name: "user-infos",
  description: "Show informations about a user",
  options: [
    {
      name: "user",
      description: "The user you want to shopw informations",
      type: "USER",
      required: false
    }
  ],
  run: async(client, interaction, args) => {
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
        return `https://singlecolorimage.com/get/${data.banner_color.slice(1)}/500x200`;
      // si y a pas de couleur non plus (probablement un bot) on renvoie null
      } else {
        return null;
      }
    }

    function status(){
      if (guild.ownerId === user.id) {
        return "Owner";
      } else if (mbr.permissions.has("ADMINISTRATOR")) {
        return "Admin";
      } else if (mbr.permissions.has("MANAGE_MESSAGES")) {
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

    var userEmbed = new MessageEmbed({
      title: "Informations sur "+user.username,
      color: mbr.displayColor!==0?mbr.displayColor:"#2F3136",
      thumbnail: {
        url: user.avatar?user.avatarURL({ dynamic: true, format: "png" }):user.defaultAvatarURL
      },
      fields: [
        {
          name: "ID",
          value: `${user.id}`,
          inline: true
        },
        {
          name: "Pseudo sur le serv",
          value: mbr.nickname?mbr.nickname:"Aucun",
          inline: true
        },
        {
          name: "Badges",
          value: `${badges}`,
          inline: true
        },
        {
          name: "Rang",
          value: `${status()}`,
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
        },
        {
          name: "Boost",
          value: `${mbr.premiumSince!==null?date(mbr.premiumSince):"Ne boost pas"}`
        }
      ]
    });

    var banner = null;
    await getBanner(user.id).then(res => banner = res);

    if (banner !== null) {
      userEmbed.setImage(banner);
    }

    interaction.deleteReply();
    interaction.channel.send({ embeds: [userEmbed] });
  }
}
