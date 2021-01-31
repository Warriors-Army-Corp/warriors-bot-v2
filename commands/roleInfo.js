// appel des RichEmbed du package discord.js
const { RichEmbed } = require('discord.js');

// exportation du code
exports.cmd = (client, msg, args) => {
  // on recole les éléments de l'array
  var role = args.join(" ");

  // si y a un argument (ça marche pas laisse tomber)
  if (role != "") {
    // on cherche le rôle parmi les rôles du serveur
    role = msg.guild.roles.find("name", role);

    // si le rôle a été trouvé
    if (role) {
      // initialisation de la variable memberCount
      var memberCount = 0;
      // pour tout les membres qui ont ce rôle, on incrémente la variable memberCount
      role.members.forEach(owo => memberCount++);

      // initialisation de la variable mention
      var mention = "";
      // si le rôle est mentionable
      if (role.mentionable) {
        // mettre la variable mention à YEP!
        mention = "YEP!";
      // sinon
      }else {
        // mettre la variable mention à NOPE!
        mention = "NOPE!";
      }

      // initialisation de la varibale separe
      var separe = "";
      // si le rôle est séparé des autres
      if (role.hoist) {
        // mettre la variable separe à YEP!
        separe = "YEP!"
      }else {
        // mettre la variable separe à NOPE!
        separe = "NOPE!"
      }

      // création de l'embed
      var roleEmbed = new RichEmbed().setTitle(`INFO SUR LE ROLE **${role.name}**`)
        .setColor("#000001")
        .setFooter(`Role ID : ${role.id} | ${client.MARQUE}`, client.THUMB)
        .setThumbnail("https://cdn.discordapp.com/emojis/395628357414551574.png?v=1")
        .addField("Membres avec ce role", memberCount, true)
        .addField("Mentionnable", mention, true)
        .addField("Séparé des autres", separe, true)
        .addField("Couleur", role.hexColor, true)
      msg.channel.sendEmbed(roleEmbed);
    }else {
      msg.reply("Mais t'es teubé ou quoi? il existe pas celui là :facepalm:")
    }
  }else {
    msg.reply("faut mettre un nom de role svp :/")
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "roleInfo [role_name]",
  desc: "Permet d'avoir quelques infos sur un rôle."
}
