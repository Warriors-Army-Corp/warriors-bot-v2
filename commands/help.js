const { MessageEmbed, Collection } = require('discord.js');

exports.cmd = (client, msg) => {

  const helpEmbed = new MessageEmbed({
    "title": `LISTE DES COMMANDES | prefix : ${client.PREFIX}`,
    "description": "Ce qu'il y a entre `[]` sont les arguments à écrire. Les `()` signifient que les arguments sont optionnels. Les `[]` et les `()` ne sont pas à écrire.",
    "color": msg.member.displayColor,
    "thumbnail": {
      "url": "https://cdn.discordapp.com/emojis/395627468276367370.png?v=1"
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
