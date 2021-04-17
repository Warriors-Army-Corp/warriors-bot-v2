const tempy = require('tempy');
const QrCode = require('qrcode-reader');
const Jimp = require("jimp");
const getLink = require('../fonctions/getLink.js');
const download = require('../fonctions/download.js');

exports.cmd = async (client, msg, args) => {
  const link = getLink(msg, args);

  if (link !== null) {
    const output = await tempy.file({extension: 'png'});
    const check = await download(link, output);
    if (check) {
      Jimp.read(output, (err, img) => {
        if (err) {
          console.error(err);
        }

        const qr = new QrCode();
        qr.callback = function(err, value){
          if (err) {
            msg.channel.send("Je n'ai pas pu décoder votre image :/");
            return 1;
          }

          msg.channel.send(value.result);
        }
        try {
          qr.decode(img.bitmap);
        } catch (e) {
          msg.channel.send("Le lien n'est pas une image.");
        }
      });
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
  categ: "FUN"
}
