exports.cmd = async (client, msg, args) => {
  // si il y a des paramètres
  if (args.length>0) {
    msg.channel.send("https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl="+args.join("%20"));
  // si y a aucun paramètres on dit ce dont on a besoin
  }else {
    msg.channel.send("Il me faut du texte svp 👀");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "qrcode",
  args: "[un texte quelconque]",
  desc: "Permet de transformer votre texte en image QR code.",
  categ: "FUN",
  author: "Mizari"
}
