// fonction pour chopper une invite du serv s'il y en a une, en créer une s'il y en a pas
module.exports = async function createInvite(msg){
  invites = 0; // initialisation d'une variable qui contiendra la liste des invites du serv
  invite = 0; // initialisation d'une variable qui contiendra l'invite finale

  // on récupère la liste des invites du serv
  await msg.guild.fetchInvites().then(inv => invites = inv);
  // s'il y a au moins une invite sur le serv
  if (invites.size > 0) {
    // on récupère la première invite de la liste
    invite = invites.keys().next().value;
  // s'il n'y a pas d'invite sur le serv
  } else {
    var ch = null; // initialisation d'une variable qui contiendra le salon
    const chs = Array.from(msg.guild.channels.cache); // on récupère la liste des salons du serv

    // on parcour les salons du serv
    for (var i = 0; i < chs.length; i++) {
      // si ce n'est pas une catégorie
      if (chs[i][1].type !== "category") {
        // on récupère le salon
        ch = msg.guild.channels.cache.get(chs[i][0]);
        // on sort de la boucle
        break;
      }
    }
    // une fois sorti de la boucle on créer une invite pour ce salon et on récupère le code de la nouvelle invite
    await ch.createInvite({maxAge: 0}).then(inv => invite = inv);
  }
  // on renvoit l'invite finale
  return invite;
}
