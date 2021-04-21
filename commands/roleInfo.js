// appel des RichEmbed du package discord.js
const { MessageEmbed } = require('discord.js');

// exportation du code
exports.cmd = (client, msg, args) => {
  // on recole les éléments de l'array
  var role = args.join(" ");

  // si y a un argument (ça marche pas laisse tomber)
  if (role != "") {
    var roles = [];
    var check = false;
    msg.guild.roles.cache.each(rl => {
      if(rl.name.includes(role) && !check){
        role = rl;
        check = true;
      }
    });

    // si le rôle a été trouvé
    if (check) {
      // initialisation de la variable memberCount
      var memberCount = 0;
      // pour tout les membres qui ont ce rôle, on incrémente la variable memberCount
      role.members.forEach(owo => memberCount++);

      // initialisation de la variable mention
      var mention = (role.mentionable ? "✅" : "❌");

      // initialisation de la varibale separe
      var separe = (role.hoist ? "✅" : "❌");

      // création de l'embed
      var roleEmbed = new MessageEmbed({
        "title": `INFO SUR LE ROLE **${role.name}**`,
        "color": role.color,
        "thumbnail": {
          "url": "https://media.discordapp.net/attachments/661396307973242894/830494635301273640/Capture_decran_2021-04-10_a_19.28.51.png?width=498&height=498"
        },
        "footer": {
          "icon_url": client.THUMB,
          "text": `Role ID : ${role.id} | ${client.MARQUE}`
        },
        "fields": [
          {
            "name": "Membres avec ce role",
            "value": memberCount,
            "inline": true
          },
          {
            "name": "Mentionnable",
            "value": mention,
            "inline": true
          },
          {
            "name": "Séparé des autres",
            "value": separe,
            "inline": true
          },
          {
            "name": "Couleur",
            "value": role.hexColor,
            "inline": true
          }
        ]
      });

      msg.channel.send(roleEmbed);
    }else {
      msg.reply("Mais t'es teubé ou quoi? il existe pas celui là :facepalm:")
    }
  }else {
    msg.reply("faut mettre un nom de role svp :/")
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "roleInfo",
  args: "[nom du rôle]",
  desc: "Permet d'avoir quelques infos sur un rôle.",
  categ: "UTILITY",
  author: "Mizari"
}
