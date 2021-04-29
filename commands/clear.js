exports.cmd = (client, msg, args) => {
  // on vérifie que le bot a la perm de gérer les messages
  var clientMember = msg.guild.members.cache.find(mbr => mbr.id === client.user.id);
  if (clientMember.hasPermission("MANAGE_MESSAGES")) {
    // on vérifie que la personne a la perm de gérer les messages
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      // si c'est le cas on supprime son message plus le nombre de message qu'il a demandé
      msg.channel.bulkDelete((args | 0) + 1);
    } else {
      // si il a pas la perm on lui dit
      msg.reply("T'as pas les perms deso :/");
    }
  } else {
    msg.reply("Je n'ai pas les perms pour faire ça :/");
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
