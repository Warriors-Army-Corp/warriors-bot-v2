exports.cmd = (client, msg, args) => {
  // on vérifie que la personne a la perm de gérer les messages
  if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    // si c'est le cas on supprime son message plus le nombre de message qu'il a demandé
    msg.channel.bulkDelete((args | 0) + 1);
  } else {
    // si il a pas la perm on lui dit
    msg.reply("t'as pas les perms deso :/");
  }
}

exports.help = {
  perm: "MANAGE_MESSAGES",
  cmd: "clear",
  args: "[nombre]",
  desc: "Permet de supprimer un grand nombre de messages.",
  categ: "MODERATION",
  author: "Mizari"
}
