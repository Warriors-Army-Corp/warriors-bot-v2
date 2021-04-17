// importation des packages dont on a besoin
const QRCode = require('qrcode');
const tempy = require('tempy');

exports.cmd = async (client, msg, args) => {
  // si il y a des paramètres
  if (args.length>0) {
    // on prépare un fichier de sortit dans le dossier tmp
    const output = tempy.file({extension: 'png'});

    // on créer le QR code qu'on écrit dans le fichier préparé juste avant avec les paramètres donnés par l'utilisateur
    QRCode.toFile(output, args.join(" "), {margin: 1}, function (error) {
      // si y a une erreur on l'affiche dans la console
      if (error) console.error(error);
      // si tout se passe bien on send l'image du QR code
      msg.channel.send({
        files: [{
          attachment: output,
          name: 'WAC_QRcode.png'
        }]
      }).catch();
    });
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
  categ: "FUN"
}
