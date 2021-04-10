module.exports = async (messageReaction, user) => {
  const msg = messageReaction.message; // le message qui a reçu la réaction
  const emote = messageReaction.emoji.name; // l'émote de la réaction
  const mbr = msg.guild.members.cache.get(user.id); // le membre qui réagit
  const stringToHex = require("../fonctions/stringToHex.js");
  if (user.bot) return; // si l'utilisateur est un bot, on fait rien
  if (msg.guild.id !== "585906194724552706") return; // si on est pas sur le bon serv, on fait rien

  if (messageReaction.partial){
    await messageReaction.fetch();
  }

  switch (msg.id) {
    case "700738908765552652":
      if (["\uD83D\uDC82\u200D\u2640\uFE0F", "\uD83D\uDC82\u200D\u2642\uFE0F"].includes(emote)) {
        switch (emote) {
          case "\uD83D\uDC82\u200D\u2640\uFE0F":
            await mbr.roles.add("700676156885696514");
            console.log("soldate : "+ stringToHex(emote));
            break;
          case "\uD83D\uDC82\u200D\u2642\uFE0F":
            await mbr.roles.add("700675718002114660");
            console.log("soldat : "+ stringToHex(emote));
            break;
          default:
            console.log("sexe : "+ stringToHex(emote));
        }
      }
      break;
      case "700739894682583191":
        if (["\uD83D\uDC76", "\uD83E\uDDD2", "\uD83E\uDDD4"].includes(emote)) {
          switch (emote) {
            case "\uD83D\uDC76":
              await mbr.roles.add("700284813923451000");
              console.log("bébé : "+ stringToHex(emote));
              break;
            case "\ud83e\uddd2":
              await mbr.roles.add("700458610534383807");
              console.log("ados : "+ stringToHex(emote));
              break;
            case "\ud83e\uddd4":
              await mbr.roles.add("700458717761634315");
              console.log("vieux : "+ stringToHex(emote));
              break;
            default:
              console.log("age : "+ stringToHex(emote));
          }
        }
        break;
        case "700741011042861127":
          if (["\uD83C\uDF8E", "\uD83C\uDFAE", "\uD83D\uDD8C\uFE0F", "\u270D\uFE0F", "\uD83D\uDCD6", "h4x0r", "\uD83C\uDFB5"].includes(emote)) {
            switch (emote) {
              case "\uD83C\uDF8E":
                await mbr.roles.add("700665400320327680");
                console.log("manga : "+ stringToHex(emote));
                break;
              case "\ud83c\udfae":
                await mbr.roles.add("700665299225149472");
                console.log("jeux vidéo : "+ stringToHex(emote));
                break;
              case "\ud83d\udd8c\ufe0f":
                await mbr.roles.add("700665418691379262");
                console.log("dessin : "+ stringToHex(emote));
                break;
              case "\u270d\ufe0f":
                await mbr.roles.add("700665405772922960");
                console.log("ecriture : "+ stringToHex(emote));
                break;
              case "\uD83D\uDCD6":
                await mbr.roles.add("700665410441314354");
                console.log("livre : "+ stringToHex(emote));
                break;
              case "h4x0r":
                await mbr.roles.add("725026216461205526");
                console.log("hackeur : "+ emote);
                break;
              case "\ud83c\udfb5":
                await mbr.roles.add("806142199170727976");
                console.log("musique : "+ stringToHex(emote));
                break;
              default:
                console.log("activite : "+ stringToHex(emote));
            }
          }
          break;
        case "700772763123580978":
          if (emote === "🚩" && mbr.roles.cache.get("643209189971329083")) {
            mbr.roles.add("643210975222300703");
          }
          break;
        default:
          console.log("rien : "+ stringToHex(emote));
  }
}
