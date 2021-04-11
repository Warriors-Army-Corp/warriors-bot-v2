exports.cmd = /*async si besoin*/ (client, msg, args) => {
  const user = msg.mentions.users.first();
  // si y a une mention on affiche la pp de la personne mentionnée
  if (user) {
    // si la pp est un gif, elle sera animé. "?size=1280" permet de redimentionné au format le plus grand
    msg.channel.send(user.avatarURL({dynamic: true})+"?size=4096");
  // si y a pas de mention on affiche la pp de l'auteur du message
  } else {
    // si la pp est un gif, elle sera animé. "?size=1280" permet de redimentionné au format le plus grand
    msg.channel.send(msg.author.avatarURL({dynamic: true})+"?size=4096");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "pp",
  args: "([@ping])",
  desc: "Permet d'afficher la photo de profil d'un utilisateur en grand."
}
