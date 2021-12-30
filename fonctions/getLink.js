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
      // on dit qu'il y a rien
      return null;
    }
  // sinon
  } else {
    // on dit qu'il y a rien
    return null;
  }
}
