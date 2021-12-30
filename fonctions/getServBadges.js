module.exports = function getBadges(guild) {
  var badges = []; // initialisation du tableau qui contiendra les badges

  switch (guild.premiumTier) {
    case "TIER_1":
      badges.push("<:boost_lvl1:869917347975155712>");
      break;
    case "TIER_2":
      badges.push("<:boost_lvl2:869917333320269845>");
      break;
    case "TIER_3":
      badges.push("<:boost_lvl3:869916082503319613>");
      break;
  }

  if (guild.verified) {
    badges.push("<:verified:869918381401309244>");
  }

  if (guild.partnered) {
    badges.push("<:partner:869919561657487412>");
  }

  if (badges.length < 1) {
    badges.push("Aucun");
  }

  return badges;
}
