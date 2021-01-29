const { RichEmbed } = require('discord.js');

module.exports = (client, msg) => {
  //fonction pour l'embed
  function userEmbedF(author, avatar, msgA, mbr) {
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

    var userEmbed = new RichEmbed().setColor("#000001")
      .setFooter(`user ID : ${mbr.id} | ${client.MARQUE}`, client.THUMB)
      .setTitle(`INFO SUR LE MEMBRE **${author}**`)
      .setThumbnail(avatar)
      .addField("Status", perm, true)
      .addField("Plus haut grade", mbr.highestRole, true)
      .addField("Arrivé sur le serveur", `${dateJ}`, true)
      .addField("Arrivé sur discord", `${dateC}`, true)

    var roleW = "";
    msg.guild.roles.forEach(rl =>{
      if (rl.id === "643209189971329083") {
        if (mbr.roles.find("id", rl.id)) {
          warrior = "YEP! 😎";
        }else {
          warrior = "NOPE! 😭";
        }
        userEmbed.addField("Est ce que c'est un warrior?", warrior, true)
      }
    });
    return userEmbed;
  }

  //quand y a un ping
  const user = msg.mentions.users.first();
  if (user) {
    const member = msg.guild.member(user);
    if (member) {

      var author = user.username;
      var avatar = user.avatarURL;
      var msgA = msg.author.avatarURL;

      msg.channel.sendEmbed(userEmbedF(author, avatar, msgA, member));
    }else {
      msg.reply("déso mais il est pas sur le serv lui :/")
    }

  //quand y en a pas
  }else{
    var author = msg.author.username;
    var avatar = msg.author.avatarURL;
    var msgA = avatar;
    var self = msg.member;
    msg.channel.sendEmbed(userEmbedF(author, avatar, msgA, self));
  }
}
