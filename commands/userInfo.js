const { MessageEmbed } = require('discord.js');

exports.cmd = (client, msg) => {
  //fonction pour l'embed
  function userEmbedF(author, avatar, mbr) {
    var dateJ = require('../fonctions/date.js')(mbr.joinedAt);
    var dateC = require('../fonctions/date.js')(mbr.user.createdAt);
    var perm = "";

    if (mbr.id === msg.guild.ownerID) {
      perm = "Owner";
    }else if (mbr.hasPermission("ADMINISTRATOR")) {
      perm = "Admin";
    }else if (mbr.hasPermission("MANAGE_MESSAGES")) {
      perm = "Modo";
    }else {
      perm = "Member";
    }

    var userEmbed = new MessageEmbed()
      .setColor(mbr.roles.highest.color)
      .setFooter(`user ID : ${mbr.id} | ${client.MARQUE}`, client.THUMB)
      .setTitle(`INFO SUR LE MEMBRE **${author}**`)
      .setThumbnail(avatar)
      .addField("Status", perm, true)
      .addField("Plus haut grade", mbr.roles.highest, true)
      .addField("Arrivé sur le serveur", `${dateJ}`, true)
      .addField("Arrivé sur discord", `${dateC}`, true)

    if (msg.guild.id === "585906194724552706") {
      var warrior = "";
      if (mbr.roles.cache.find(rl => rl.id == "643209189971329083")) {
        warrior = "YEP! 😎";
      }else {
        warrior = "NOPE! 😭";
      }
      userEmbed.addField("Est ce que c'est un warrior?", warrior, true)
    }
    return userEmbed;
  }

  //quand y a un ping
  const user = msg.mentions.users.first();
  if (user) {
    const member = msg.guild.member(user);
    if (member) {

      var author = user.username;
      var avatar = user.avatarURL();

      msg.channel.send(userEmbedF(author, avatar, member));
    }else {
      msg.reply("déso mais il est pas sur le serv lui :/")
    }

  //quand y en a pas
  }else{
    var author = msg.author.username;
    var avatar = msg.author.avatarURL();
    var self = msg.member;
    msg.channel.send(userEmbedF(author, avatar, self));
  }
}


exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "userInfo ([ping])",
  desc: "Permet d'avoir quelques infos sur une personne."
}
