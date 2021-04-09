const { MessageEmbed, Collection } = require('discord.js');

exports.cmd = (client, msg) => {

  const helpEmbed = new MessageEmbed({
    "title": `LISTE DES COMMANDES | prefix : ${client.PREFIX}`,
    "description": "Ce qu'il y a entre `[]` sont les arguments à écrire. Les `()` signifient que les arguments sont optionnels. Les `[]` et les `()` ne sont pas à écrire.",
    "color": msg.member.displayColor,
    "thumbnail": {
      "url": "https://media.discordapp.net/attachments/661396307973242894/830125899298635817/Capture_decran_2021-04-09_a_19.03.32.png?width=498&height=498"
    },
    "footer": {
      "icon_url": client.THUMB,
      "text": `${client.MARQUE}`
    }
  });

  client.commands.forEach(help => {
    if (msg.member.hasPermission(help.help.perm)) {
      var cmd = help.help.cmd;
      if (help.help.args !== "") {
        cmd += ` ${help.help.args}`
      }
      helpEmbed.addField(`\`${cmd}\``, help.help.desc);
    }
  });

  msg.channel.send(helpEmbed);
}


exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "help",
  args: "",
  desc: "Permet d'afficher ce message."
}
