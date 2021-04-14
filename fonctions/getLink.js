module.exports = function getLink(msg, args) {
  if (msg.attachments.size > 0) {
    return Array.from(msg.attachments)[0][1].url;
  }else if (args.length > 0) {
    if (args[0].includes("http") || args[0].includes("https")) {
      return args[0];
    }else {
      return null;
    }
  } else {
    return null;
  }
}
