// appel de la fonction pour avoir une invite
const createInvite = require('../fonctions/createInvite.js');

exports.cmd = async (client, msg) => {
  var guild = msg.guild; // on récupère le serv
  var player = msg.member; // on récupère le joueur

  // si le serv n'a pas la propriété "roulette"
  if (!guild.roulette) {
    // on la créée et on l'initialise à 6
    guild.roulette = 6;
  }

  // si le joueur est kickable et qu'il ne boost pas le serv
  if (player.kickable && player.premiumSinceTimestamp === 0) {
    // on choisi un nombre au hasard entre 1 (inclu) et le nombre de coups restants (inclu)
    var roll = Math.floor(Math.random() * (guild.roulette)) + 1;
    // si le nombre est égale à 1 (correspond à la balle)
    if (roll === 1) {
      // on récupère une invite
      const invite = await createInvite(msg);
      // on envoit un message en MP au perdant avec l'invite
      await msg.author.createDM().then(dm => dm.send("Vous avez joué, vous avez perdu :shrug: vous pouvez quand même revenir https://discord.gg/"+invite).catch());
      // on kick le membre (c'est le jeu ma pauvre Lucette)
      await player.kick("A perdu à la Roulette Russe").catch();
      // on envoit un message dans le salon où s'est déroulé le jeu
      await msg.channel.send("Ah! il a perdu :frowning:")
      // on réinitialise la roulette à 6
      await (guild.roulette = 6);
    // si le joueur ne s'est pas prit la balle
    } else {
      // on envoit un message dans le salon où se déroule le jeu pour dire qu'il a eu chaud
      await msg.channel.send("C'est pas passé loin :hot_face:");
      // on décrémente le nombre de coups
      await (guild.roulette--);
    }
  } else {
    // si la personne n'est pas kickable ou est booster on s'excuse pour le désagrément
    msg.reply("Je ne peux pas vous kick donc vous ne pouvez pas jouer... désolé Ô grand maître :person_bowing:")
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "roulette",
  args: "",
  desc: "Permet de jouer à la roulette russe.",
  categ: "FUN"
}
