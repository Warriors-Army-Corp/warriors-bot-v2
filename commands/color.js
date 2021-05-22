const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const checkHex = require('../fonctions/checkHex.js');

exports.cmd = async (client, msg, args) => {
const color = args[0].toLowerCase();
  var resp = await fetch("http://www.thecolorapi.com/id?hex="+color).then(res => res.json());

  if (!color || resp.code || !checkHex(color)) {
    msg.channel.send("Il faut que vous me donniez un code couleur en hexadécimal (sans `#` au début).");
  } else {
    var colorEmbed = new MessageEmbed({
      "title": "Infos sur la couleur "+resp.hex.value,
      "color": resp.hex.value,
      "description": `**RVB**
        niveau de rouge : ${resp.rgb.r}
        niveau de vert : ${resp.rgb.g}
        niveau de bleu : ${resp.rgb.b}
        -----------------------------
        **CMYK**
        niveau de cyan : ${resp.cmyk.c}
        niveau de magenta : ${resp.cmyk.m}
        niveau de jaune : ${resp.cmyk.y}
        niveau de noir : ${resp.cmyk.k}
        -----------------------------
        **HSL**
        niveau de teinte : ${resp.hsl.h}
        niveau de saturation : ${resp.hsl.s}%
        niveau d'exposition' : ${resp.hsl.l}%`,
      "image": {
        "url": `https://singlecolorimage.com/get/${resp.hex.clean}/200x100`
      }
    });
    msg.channel.send(colorEmbed);
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "couleurInfo",
  args: "[code_couleur_hexadécimal]",
  desc: "Permet de montrer la couleur d'un code couleur (hexa)",
  categ: "UTILITY",
  author: "Mizari"
}
