module.exports = function getBadges(user, mbr) {
  var badges = []; // initialisation du tableau qui contiendra les badges
  if (user.flags.toArray().length > 0) {
    // on parcour la liste des "flags"
    for (var i = 0; i < user.flags.toArray().length; i++) {
      var flag = user.flags.toArray()[i]; // on stock le flag dans une variable c'est plus pratique
      // à chaque flag son émote (=> badge)
      switch (flag) {
        case "DISCORD_EMPLOYEE":
          badges.push("<:discord_employee:831222022624510023>");
          break;
        case "PARTNERED_SERVER_OWNER":
          badges.push("<:partnered_server_owner:831222123917213716>");
          break;
        case "HYPESQUAD_EVENTS":
          badges.push("<:hypesquad_events:831222096520675419>");
          break;
        case "BUGHUNTER_LEVEL_1":
          badges.push("<:bug_hunter_lvl1:831221997341114449>");
          break;
        case "HOUSE_BRAVERY":
          badges.push("<:house_bravery:831222072159502406>");
          break;
        case "HOUSE_BRILLIANCE":
          badges.push("<:house_brilliance:831222083660939284>");
          break;
        case "HOUSE_BALANCE":
          badges.push("<:house_balance:831222059903352912>");
          break;
        case "EARLY_SUPPORTER":
          badges.push("<:early_supporter:831222034268029031>");
          break;
        case "BUGHUNTER_LEVEL_2":
          badges.push("<:bug_hunter_lvl2:831222010289979503>");
          break;
        case "VERIFIED_BOT":
          badges.push("<:verified_bot:831222135707533342>");
          break;
        case "EARLY_VERIFIED_DEVELOPER":
          badges.push("<:early_verified_bot_developer:831222047383355452>");
          break;
        default:
          console.log("flag inconnu : "+flag); // si jamais on tombe sur un cas pas prévu on l'affiche
      }
    }

    // si il boost le serveur
    if (mbr.premiumSinceTimestamp > 0) {
      badges.push("<:boost:831221972796571751>");
    }

    // si i a une pp gif c'est qu'il a nitro
    // (si il a nitro mais qu'il n'a pas de pp gif... bah il casse les couilles voilà)
    if (user.avatarURL({dynamic: true}).includes("gif")) {
      badges.push("<:nitro:831222111041093703>");
    }

  } else {

    // si c'est un bot mais qu'il n'a pas été détecté comme bot vérifié
    if (user.bot) {
      badges.push("<:bot:831221986033664080>");
    } else {
      badges = "Aucun";
    }

  }

  return badges;
}
