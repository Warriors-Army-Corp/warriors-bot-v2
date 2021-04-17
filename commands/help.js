// importation des packages dont on a besoin
const { MessageEmbed, Collection } = require('discord.js');

exports.cmd = (client, msg, args) => {

  // si y a pas de paramètres
  if (args.length === 0) {

    // on affiche la liste des commandes plus une description du bot
    const helpEmbed = new MessageEmbed({
      "title": `LISTE DES COMMANDES | prefix : ${client.PREFIX}`,
      "description": "Les `[]` indiquent les paramètres obligatoires et ne sont pas à écrire. Les `()` indiquent les paramètres optionnels et ne sont pas non plus à écrire.\nPour plus d'inforamtions sur une commande écrivez `"+client.PREFIX+"help [nom de la commande]`\nCe bot a principalement été conçu pour et par la communauté [Warriors Army Corp](https://discord.gg/N49Gxsu). Il a été ouvert au public pour en faire profiter tout le monde ! Pour l'ajouter cliquez [ici](https://discord.com/api/oauth2/authorize?client_id=591655828348731422&permissions=8&scope=bot). Pour accéder au support cliquez [ici](https://discord.gg/tDWF64AYkW).",
      "color": msg.member.displayColor,
      "thumbnail": {
        "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
      },
      "footer": {
        "icon_url": client.THUMB,
        "text": `${client.MARQUE}`
      }
    });

    // on affiche la liste par catégorie (c'est tout un bordel)
    var util = [];
    var modo = [];
    var fun = [];

    client.commands.forEach(help => {
      if (msg.member.hasPermission(help.help.perm)) {
        if (help.help.categ === "UTILITY") {
          util.push("`"+help.help.cmd+"`");
        } else if (help.help.categ === "FUN") {
          fun.push("`"+help.help.cmd+"`");
        } else if (help.help.categ === "MODERATION") {
          modo.push("`"+help.help.cmd+"`");
        }
      }
    });

    if (util.length > 0) {
      helpEmbed.addField("UTILE", util.join(", "));
    }
    if (fun.length > 0) {
      helpEmbed.addField("FUN", fun.join(", "));
    }
    if (modo.length > 0) {
      helpEmbed.addField("MODERATION", modo.join(", "));
    }

    msg.channel.send(helpEmbed);

  // si y a un paramètre qui correspondant à une commande on affiche l'aide correspondant au paramètre
  } else if (client.commands.get(args[0])) {
    const cmdHelp = client.commands.get(args[0]).help;
    const helpEmbed = new MessageEmbed({
      "color": msg.member.displayColor,
      "title": "Description de la commande "+cmdHelp.cmd,
      "thumbnail": {
        "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
      },
      "description": `\`${client.commands.get(args[0]).help.cmd}${(cmdHelp.args!=="")?(" "+cmdHelp.args):""}\`
        ${cmdHelp.desc}`
    });

    if (cmdHelp.author) {
      helpEmbed.setFooter("co-développé avec "+cmdHelp.author);
    }

    msg.channel.send(helpEmbed);

  // si la commande n'existe pas on lui dit
  } else {
    msg.channel.send("Cette commande n'existe pas.");
  }
}


exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "help",
  args: "(nom d'une commande)",
  desc: "Permet d'afficher la liste des commandes ou les détails d'une commande spécifique.",
  categ: "UTILITY"
}
