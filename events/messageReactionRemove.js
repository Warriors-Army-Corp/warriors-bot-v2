module.exports = async (messageReaction, user) => {
  const msg = messageReaction.message; // le message qui a reçu la réaction
  const emote = messageReaction.emoji.name; // l'émote de la réaction
  const mbr = msg.guild.members.cache.get(user.id); // le membre qui réagit
  if (user.bot) return; // si l'utilisateur est un bot, on fait rien
  if (msg.guild.id !== "585906194724552706") return; // si on est pas sur le bon serv, on fait rien

  if (messageReaction.partial){
    await messageReaction.fetch();
  }

  switch (msg.id) {
    case "700738908765552652":
      if (["💂‍♀️", "💂‍♂️"].includes(emote)) {
        switch (emote) {
          case "💂":
            mbr.roles.remove("700676156885696514");
            break;
          case "💂‍♂️":
            mbr.roles.remove("700675718002114660");
            break;
        }
      }
      break;
      case "700739894682583191":
        if (["👶", "🧒", "🧔"].includes(emote)) {
          switch (emote) {
            case "👶":
              mbr.roles.remove("700284813923451000");
              break;
            case "‍🧒":
              mbr.roles.remove("700458610534383807");
              break;
            case "‍🧔":
              mbr.roles.remove("700458717761634315");
              break;
          }
        }
        break;
        case "700741011042861127":
          if (["🎎", "🎮", "🖌️", "✍️", "📖", "<:h4x0r:717763734835167273>", "🎵"].includes(emote)) {
            switch (emote) {
              case "🎎":
                mbr.roles.remove("700665400320327680");
                break;
              case "‍🎮":
                mbr.roles.remove("700665299225149472");
                break;
              case "‍🖌️":
                mbr.roles.remove("700665418691379262");
                break;
              case "‍✍️":
                mbr.roles.remove("700665405772922960");
                break;
              case "📖":
                mbr.roles.remove("700665410441314354");
                break;
              case "‍<:h4x0r:717763734835167273>":
                mbr.roles.remove("725026216461205526");
                break;
              case "‍🎵":
                mbr.roles.remove("806142199170727976");
                break;
            }
          }
          break;
        case "700738908765552652":
          if (emote === "🚩" && mbr.roles.cache.get("643209189971329083")) {
            mbr.roles.remove("643210975222300703");
          }
          break;
  }

}
