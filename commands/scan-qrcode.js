// importation des packages dont on a besoin
const tempy = require('tempy');
const QrCode = require('qrcode-reader');
const Jimp = require("jimp");
// importation des fonctions dont on a besoin
const getLink = require('../fonctions/getLink.js');
const download = require('../fonctions/download.js');

exports.cmd = async (client, msg, args) => {
  // petite fonction des familles pour chopper une url
  const link = getLink(msg, args);

  // si on a réussi à chopper l'url
  if (link !== null) {
    // on prépare un fichier dans le dossier tmp
    const output = await tempy.file({extension: 'png'});

    console.log(tempy.root);

    // on télécharge l'image de l'url qu'on a choppé
    const check = await download(link, output);
    // on vérifie que c t bien une image
    if (check) {
      // on lit le contenu de l'image
      Jimp.read(output, (err, img) => {
        // gestion d'erreur
        if (err) {
          console.error(err);
        }

        // on prépare le scan
        const qr = new QrCode();
        // on dit ce qu'on doit faire quand on scan
        qr.callback = function(err, value){
          // gestion d'erreur
          if (err) {
            msg.channel.send("Je n'ai pas pu décoder votre image :/");
            return 1;
          }

          // si le scan se passe bien on affiche le résultat tout simplement
          msg.channel.send(value.result, {disableMentions: "all"});
        }
        // gestion d'erreur
        try {
          // on scan l'image
          qr.decode(img.bitmap);
        } catch (e) {
          msg.channel.send("Le lien n'est pas une image.");
        }
      });
    // gestion des cas où l'utilisateur fait nimp'
    }else {
      msg.channel.send("Il me faut un lien valide svp.");
    }
  }else {
    msg.channel.send("Il me faut une image ou le lien d'une image svp.");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "scan-qrcode",
  args: "[une image ou le lien d'une image]",
  desc: "Permet de lire un QR code.",
  categ: "FUN",
  author: "Mizari"
}
