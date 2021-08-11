// importation des packages dont on a besoin
const { MessageEmbed } = require('discord.js');
const { Menu } = require('discord.js-menu');

exports.cmd = (client, msg, args) => {

  // si y a pas de paramètres
  if (args.length === 0) {
    // tous les embeds
    var embeds = [];
    // les catégories
    var util = [];
    var modo = [];
    var fun = [];
    // création des listes des commandes suivant leur catégories (et en fonction des perms du user aussi)
    client.commands.forEach(help => {
      if (msg.member.permissions.has(help.help.perm) && msg.guild.me.permissions.has(help.help.perm)) {
        if (help.help.categ === "UTILITY") {
          util.push("`"+help.help.cmd+"`");
        } else if (help.help.categ === "FUN") {
          fun.push("`"+help.help.cmd+"`");
        } else if (help.help.categ === "MODERATION") {
          modo.push("`"+help.help.cmd+"`");
        }
      }
    });

    // contage des pages
    var countPages = 1; // initialisé à un car il y aura toujours forcément la page infos
    if (util.length > 0) {
      countPages++;
    }
    if (fun.length > 0) {
      countPages++;
    }
    if (modo.length > 0) {
      countPages++;
    }

    // on créer d'abord l'embed d'infos
    const infosEmbed = {
      name: "Infos",
      content: new MessageEmbed({
        "title": `Infos sur le bot`,
        "description": "Ce bot a principalement été conçu pour et par la communauté [Warriors Army Corp](https://discord.gg/N49Gxsu). Il a été ouvert au public pour en faire profiter tout le monde ! Pour l'ajouter cliquez [ici](https://discord.com/api/oauth2/authorize?client_id=591655828348731422&permissions=8&scope=bot). Pour accéder au support cliquez [ici](https://discord.gg/tDWF64AYkW).\n\nTous les dessins ont été réalisés par Ema.",
        "color": msg.member.displayColor,
        "thumbnail": {
          "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
        },
        "footer": {
          "icon_url": client.THUMB,
          "text": `${client.MARQUE}\t\t\t\t\t\t\t\t\t\t\t\t\t\tPage 1 sur ${countPages}`
        }
      }),
      reactions: {
        '⬅️': 'previous',
        '➡️': 'next'
      }
    }

    // on ajoute l'embed infos aux embeds
    embeds.push(infosEmbed);

    // phrase qu'il y aura sur chaque embeds (sauf le premier)
    const infosUtilisation = "Les `[]` indiquent les paramètres obligatoires et ne sont pas à écrire. Les `()` indiquent les paramètres optionnels et ne sont pas non plus à écrire.\nPour plus d'informations sur une commande écrivez `"+client.PREFIX+"help [nom_de_la_commande]`\n\n";

    // on construit les embeds des différentes catégories
    if (util.length > 0) {
      const utilEmbed = {
        name: "UTILE",
        content: new MessageEmbed({
          "title": "UTILE",
          "description": infosUtilisation+util.join(", "),
          "color": msg.member.displayColor,
          "thumbnail": {
            "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
          },
          "footer": {
            "icon_url": client.THUMB,
            "text": `${client.MARQUE}\t\t\t\t\t\t\t\t\t\t\t\t\t\tPage 2 sur ${countPages}`
          }
        }),
        reactions: {
          '⬅️': 'previous',
          '➡️': 'next'
        }
      }
      embeds.push(utilEmbed);
    }
    if (fun.length > 0) {
      const funEmbed = {
        name: "FUN",
        content: new MessageEmbed({
          "title": "FUN",
          "description": infosUtilisation+fun.join(", "),
          "color": msg.member.displayColor,
          "thumbnail": {
            "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
          },
          "footer": {
            "icon_url": client.THUMB,
            "text": `${client.MARQUE}\t\t\t\t\t\t\t\t\t\t\t\t\t\tPage 3 sur ${countPages}`
          }
        }),
        reactions: {
          '⬅️': 'previous',
          '➡️': 'next'
        }
      }
      embeds.push(funEmbed);
    }
    if (modo.length > 0) {
      const modoEmbed = {
        name: "MODERATION",
        content: new MessageEmbed({
          "title": "MODERATION",
          "description": infosUtilisation+modo.join(", "),
          "color": msg.member.displayColor,
          "thumbnail": {
            "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
          },
          "footer": {
            "icon_url": client.THUMB,
            "text": `${client.MARQUE}\t\t\t\t\t\t\t\t\t\t\t\t\t\tPage 4 sur ${countPages}`
          }
        }),
        reactions: {
          '⬅️': 'previous',
          '➡️': 'next'
        }
      }
      embeds.push(modoEmbed);
    }

    const helpEmbed = new Menu(msg.channel, msg.author.id, embeds, 300000);
    helpEmbed.start();

  // si y a un paramètre qui correspondant à une commande on affiche l'aide correspondant au paramètre
  } else if (client.commands.get(args[0].toLowerCase())) {
    const cmdHelp = client.commands.get(args[0].toLowerCase()).help;
    const helpEmbed = new MessageEmbed({
      "color": msg.member.displayColor,
      "title": "Description de la commande "+cmdHelp.cmd,
      "thumbnail": {
        "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
      },
      "description": `\`${cmdHelp.cmd}${(cmdHelp.args!=="")?(" "+cmdHelp.args):""}\`
        ${cmdHelp.desc}`,
      "footer":{
        "text": `développée par ${cmdHelp.author}`
      }
    });

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
  categ: "UTILITY",
  author: "Mizari"
}
