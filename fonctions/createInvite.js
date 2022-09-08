const { ChannelType } = require("discord.js");

// fonction pour chopper une invite du serv s'il y en a une, en créer une s'il y en a pas
module.exports = async function createInvite(interaction){
  invites = interaction.guild.invites.cache; // initialisation d'une variable qui contiendra la liste des invites du serv
  invite = 0; // initialisation d'une variable qui contiendra l'invite finale

  // s'il y a au moins une invite sur le serv
  if (invites.size > 0) {
    // on récupère la première invite de la liste
    invite = invites.keys().next().value;
  // s'il n'y a pas d'invite sur le serv
  } else {
    var ch = null; // initialisation d'une variable qui contiendra le salon
    const chs = Array.from(interaction.guild.channels.cache); // on récupère la liste des salons du serv
    console.log(chs);
    // on parcour les salons du serv
    for (var i = 0; i < chs.length; i++) {
      // si ce n'est pas une catégorie
      if (chs[i][1].type !== ChannelType.GuildCategory && chs[i][1].permissionsFor(interaction.guild.members.me).has("CREATE_INSTANT_INVITE")) {
        // on récupère le salon
        ch = interaction.guild.channels.cache.get(chs[i][0]);
        // on sort de la boucle
        break;
      }
    }
    // une fois sorti de la boucle on créer une invite pour ce salon et on récupère le code de la nouvelle invite
    if (ch != null) {
      await ch.createInvite({maxAge: 0}).then(inv => invite = inv);
    }
  }
  // on renvoit l'invite finale
  return invite;
}
