const colors = require('./colors.js');

/**
 * getLink
 * @param {String} msg
 * @param {String[]} args
 */
module.exports = function getLink(msg, args) {
  // si y a des attachments dans le message
  if (msg.attachments.size > 0) {
    // on renvoit l'url du premier
    return Array.from(msg.attachments)[0][1].url;
  // si y en a pas mais que y a des arguments
  }else if (args.length > 0) {
    // que le premier argument commence par "http" ou "https"
    if (args[0].includes("http") || args[0].includes("https")) {
      // on renvoit le premier arfument
      return args[0];
    // sinon
    }else {
      console.log(`[${colors.FgRed}   Error    ${colors.Reset}]\targs[0] doesn't includes "http" or "https" : ${args[0]}\n\t\targs : ${args}`);
      // on dit qu'il y a rien
      return null;
    }
  // sinon
  } else {
    console.log(`[${colors.FgRed}   Error    ${colors.Reset}]\tno args : ${args}`);
    // on dit qu'il y a rien
    return null;
  }
}
