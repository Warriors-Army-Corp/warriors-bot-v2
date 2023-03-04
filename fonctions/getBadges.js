const colors = require('./colors.js');
const fetch = require('node-fetch');

module.exports = async function getBadges(user, mbr) {
  var badges = []; // initialisation du tableau qui contiendra les badges
  if (user.flags) {
    // on parcour la liste des "flags"
    for (var i = 0; i < user.flags.toArray().length; i++) {
      var flag = user.flags.toArray()[i]; // on stock le flag dans une variable c'est plus pratique
      // à chaque flag son émote (=> badge)
      switch (flag) {
        case "Staff":
          badges.push("<:discord_employee:831222022624510023>");
          break;
        case "Partner":
          badges.push("<:partnered_server_owner:831222123917213716>");
          break;
        case "Hypesquad":
          badges.push("<:hypesquad_events:831222096520675419>");
          break;
        case "BugHunterLevel1":
          badges.push("<:bug_hunter_lvl1:831221997341114449>");
          break;
        case "HypeSquadOnlineHouse1":
          badges.push("<:house_bravery:831222072159502406>");
          break;
        case "HypeSquadOnlineHouse2":
          badges.push("<:house_brilliance:831222083660939284>");
          break;
        case "HypeSquadOnlineHouse3":
          badges.push("<:house_balance:831222059903352912>");
          break;
        case "PremiumEarlySupporter":
          badges.push("<:early_supporter:831222034268029031>");
          break;
        case "BugHunterLevel2":
          badges.push("<:bug_hunter_lvl2:831222010289979503>");
          break;
        case "VerifiedBot":
          badges.push("<:verified_bot:870765263669309580>");
          break;
        case "VerifiedDeveloper":
          badges.push("<:early_verified_bot_developer:831222047383355452>");
          break;
        case "ActiveDeveloper":
          badges.push("<:active_developer:1047230188385206424>");
          break;
        default:
          console.log(`[${colors.FgRed}Unknown flag${colors.Reset}] ${flag}`); // si jamais on tombe sur un cas pas prévu on l'affiche
      }
    }

    // si il boost le serveur
    if (mbr.premiumSinceTimestamp > 0) {
      const time = Date.now() - mbr.premiumSince;
      if (time < 5259600000) {
        badges.push("<:boost_1month:871023774311526440>");
      } else if (time < 7889400000) {
        badges.push("<:boost_2months:871023785246072833>");
      } else if (time < 15778800000) {
        badges.push("<:boost_3months:871023797694763039>");
      } else if (time < 23668200000) {
        badges.push("<:boost_6months:871023809187172363>");
      } else if (time < 31557600000) {
        badges.push("<:boost_9months:871023820067188767>");
      } else if (time < 39447000000) {
        badges.push("<:boost_12months:871023831324717138>");
      } else if (time < 47336400000) {
        badges.push("<:boost_15months:871023842699657256>");
      } else if (time < 63115200000) {
        badges.push("<:boost_18months:871023858411524148>");
      } else {
        badges.push("<:boost_24months:871023871682314300>");
      }
    }

    // si i a une pp gif c'est qu'il a nitro
    // (si il a nitro mais qu'il n'a pas de pp gif... bah il casse les couilles voilà)
    var data = await fetch('https://discord.com/api/users/'+user.id, {
      method: 'get',
      headers: {Authorization: "Bot "+process.env.TOKEN}
    }).then(res => res.json()).catch();

    if ((user.avatar && user.avatarURL({dynamic: true}).includes("gif")) || data.banner !== null) {
      badges.push("<:nitro:831222111041093703>");
    }

  }

  // si c'est un bot mais qu'il n'a pas été détecté comme bot vérifié
  if (user.bot) {
    badges.push("<:bot:870765250725695548>");
  }

  return badges.length>0?badges.join(""):"Aucun";
}
