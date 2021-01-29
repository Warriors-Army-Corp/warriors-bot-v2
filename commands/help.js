const { MessageEmbed, Collection } = require('discord.js');

exports.cmd = (client, msg) => {

  const helpEmbed = new MessageEmbed()
    .setTitle(`LISTE DES COMMANDES | prefix : ${client.PREFIX}`)
    .setColor(msg.member.roles.highest.color)
    .setFooter(`${client.MARQUE}`, client.THUMB)
    .setThumbnail("https://cdn.discordapp.com/emojis/395627468276367370.png?v=1")

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
