const QRCode = require('qrcode');
const tempy = require('tempy');

exports.cmd = async (client, msg, args) => {
  if (args.length>0) {
    const output = tempy.file({extension: 'png'});
    console.log(output);

    QRCode.toFile(output, args.join(" "), {margin: 1}, function (error) {
      if (error) console.error(error);
      msg.channel.send({
        files: [{
          attachment: output,
          name: 'WAC_QRcode.png'
        }]
      }).catch();
    });
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
