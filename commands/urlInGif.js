// importation des packages dont on a besoin
const { MessageEmbed } = require('discord.js');

exports.cmd = (client, msg, args) => {

  // on check qu'il y a au moins un argument
  if (args.length > 0) {
    // l'url à save est le premier argument
    var url = args[0];

    // on créer l'embed
    var embed = new MessageEmbed({
      "description": "L'URL caché dans le gif est "+url,
      "url": url,
      "image": {
        "url": "https://media.discordapp.net/attachments/586232536934645790/823251570853543947/W.A.C-PP-withoutloop.gif"
      }
    });

    // on envoit l'embed (si l'argument n'était pas une URL ça génère une erreur, du coup on engueule le user)
    msg.channel.send(embed).catch(() => msg.channel.send("Vous devez me donner une URL valide et rien d'autre"));

  // si y a pas d'argument on engueule le user
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
