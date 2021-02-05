const { MessageEmbed, Collection } = require('discord.js');

exports.cmd = (client, msg) => {

  const helpEmbed = new MessageEmbed({
    "title": `LISTE DES COMMANDES | prefix : ${client.PREFIX}`,
    "color": msg.member.roles.highest.color,
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
      helpEmbed.addField(`\`${help.help.cmd}\``, help.help.desc);
    }
  });

  msg.channel.send(helpEmbed);
}


exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "help",
  desc: "Permet d'afficher ce message."
}
