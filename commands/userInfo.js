const { MessageEmbed } = require('discord.js');
const getBadges = require('../fonctions/getBadges.js');
const getRoles = require('../fonctions/getRoles.js');
const formatDate = require('../fonctions/date.js');

exports.cmd = async (client, msg) => {
  //fonction pour l'embed
  async function userEmbedF(name, avatar, mbr) {
    var dateJ = formatDate(mbr.joinedAt);
    var dateC = formatDate(mbr.user.createdAt);
    var perm = "";

    // récupération des roles (pour raison obscure, la fonction renvoit une promesse au lieu de renvoyer les roles directement...)
    var roles = "";
    await getRoles(mbr.roles.cache).then(rls => roles = rls);

    if (mbr.id === msg.guild.ownerID) {
      perm = "Owner";
    }else if (mbr.hasPermission("ADMINISTRATOR")) {
      perm = "Admin";
    }else if (mbr.hasPermission("MANAGE_MESSAGES")) {
      perm = "Modo";
    }else {
      perm = "Member";
    }

    var userEmbed = new MessageEmbed({
      "title": `INFOS SUR **${name}**`,
      "color": mbr.displayColor,
      "footer": {
        "icon_url": client.THUMB,
        "text": `${client.MARQUE}`
      },
      "thumbnail": {
        "url": avatar
      },
      "fields": [
        {
          "name": "ID",
          "value": mbr.id,
          "inline": true
        },
        {
          "name": "Pseudo",
          "value": mbr.nickname!==null?mbr.nickname:"Aucun",
          "inline": true
        },
        {
          "name": "Badges",
          "value": getBadges(mbr.user, mbr),
          "inline": true
        },
        {
          "name": "Statut",
          "value": perm,
          "inline": true
        },
        {
          "name": "Arrivé sur le serveur",
          "value": `${dateJ}`,
          "inline": true
        },
        {
          "name": "Arrivé sur discord",
          "value": `${dateC}`,
          "inline": true
        },
        {
          "name": "Boost",
          "value": mbr.premiumSinceTimestamp>0?formatDate(mbr.premiumSince):"Ne boost pas",
          "inline": true
        },
        {
          "name": "Roles ("+(mbr.roles.cache.size - 1)+")",
          "value": roles?roles:"Pas de rôles",
          "inline": true
        }
      ]
    });

    if (msg.guild.id === "585906194724552706") {
      var warrior = "";
      if (mbr.roles.cache.find(rl => rl.id == "643209189971329083")) {
        warrior = "✅";
      }else {
        warrior = "❌";
      }
      userEmbed.addField("Warrior ?", warrior, true)
    }
    return userEmbed;
  }

  //quand y a un ping
  const user = msg.mentions.users.first();
  if (user) {
    const member = msg.guild.member(user);
    if (member) {

      var name = user.username;
      var avatar = user.avatarURL({dynamic: true});

      msg.channel.send(await userEmbedF(name, avatar, member));
    }else {
      msg.reply("déso mais il est pas sur le serv lui :/")
    }

  //quand y en a pas
  }else{
    var name = msg.author.username;
    var avatar = msg.author.avatarURL({dynamic: true});
    var self = msg.member;
    msg.channel.send(await userEmbedF(name, avatar, self));
  }
}


exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "userInfo",
  args: "([@ping])",
  desc: "Permet d'avoir quelques infos sur une personne."
}
