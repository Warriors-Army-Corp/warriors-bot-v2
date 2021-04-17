exports.cmd = (client, msg, args) => {
  if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    msg.channel.bulkDelete((args | 0) + 1);
  } else {
    msg.reply("t'as pas les perms deso :/");
  }
}

exports.help = {
  perm: "MANAGE_MESSAGES",
  cmd: "clear",
  args: "[nombre]",
  desc: "Permet de supprimer un grand nombre de messages.",
  categ: "MODERATION"
}
