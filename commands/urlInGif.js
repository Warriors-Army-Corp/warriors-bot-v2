const { MessageEmbed } = require('discord.js');

exports.cmd = (client, msg, args) => {

  if (args.length > 0) {
    var url = args[0];

    var embed = new MessageEmbed({
      "description": "L'URL caché dans le gif est "+url
      "url": url,
      "image": {
        "url": "https://media.discordapp.net/attachments/586232536934645790/823251570853543947/W.A.C-PP-withoutloop.gif"
      }
    });

    msg.channel.send(embed).catch(() => msg.channel.send("Vous devez me donner une URL valide et rien d'autre"));

  } else {
    msg.channel.send("Il me faut une URL");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "url-in-gif",
  args: "[URL]",
  desc: "Donnez un lien. Ajoutez le gif afficher par le bot en favori. Envoyez le gif que vous venez d'ajouter dans n'importe quel salon. Observez la magie 😎",
  categ: "FUN",
  author: "Mizari"
}
