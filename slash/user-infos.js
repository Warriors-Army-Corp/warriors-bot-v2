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

    // fonction pour récup' la PP de serv
    async function getGuildPP(user) {
      // requête pour la bannière
      var data = await fetch(`https://discord.com/api/v9/guilds/${interaction.guild.id}/members/${user.id}`, {
        method: 'get',
        headers: {Authorization: "Bot "+client.token}
      }).then(res => res.json()).catch();

      // si il y a une PP de serv on créer le lien qui va bien
      if (data.avatar !== null) {
        return `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${user.id}/avatars/${data.avatar+(data.avatar.startsWith("a_")?".gif":".png")}`;
      // si y a pas de PP de serv on récupère la PP par défaut
      } else {
        return user.avatar?user.avatarURL({ dynamic: true, format: "png" }):user.defaultAvatarURL;
      }
    }

    // fonction pour donner un statut (assez arbitraire)
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
      color: mbr.displayColor!==0?mbr.displayColor:"#2F3136",
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

    // ajout de la bannière (si y en a une)
    var banner = null;
    await getBanner(user.id).then(res => banner = res);
    if (banner !== null) {
      userEmbed.setImage(banner);
    }

    // ajout de la PP guild
    var ppGuild = null;
    await getGuildPP(user).then(pp => ppGuild = pp);
    if (ppGuild !== null) {
      userEmbed.setThumbnail(ppGuild);
    }

    interaction.deleteReply();
    interaction.channel.send({ embeds: [userEmbed] });
  }
}
