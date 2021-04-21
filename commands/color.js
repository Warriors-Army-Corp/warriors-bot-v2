const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

exports.cmd = async (client, msg, args) => {
  var resp = await fetch("http://www.thecolorapi.com/id?hex="+args[0]).then(res => res.json());

  if (!args[0] || resp.code) {
    msg.channel.send("Il faut que vous me donniez un code couleur en hexadécimal (sans `#` au début).");
  } else {
    var colorEmbed = new MessageEmbed({
      "title": "Infos sur la couleur "+resp.hex.value,
      "color": resp.hex.value,
      "description": `niveau de rouge : ${resp.rgb.r}
        niveau de vert : ${resp.rgb.g}
        niveau de bleu : ${resp.rgb.b}
        niveau de teinte : ${resp.hsl.h}
        niveau de saturation : ${resp.hsl.s}%
        niveau de lumière : ${resp.hsl.l}%
        niveau de cyan : ${resp.cmyk.c}
        niveau de magenta : ${resp.cmyk.m}
        niveau de jaune : ${resp.cmyk.y}
        niveau de noir : ${resp.cmyk.k}`,
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
  args: "[code couleur hexadécimal]",
  desc: "Permet de montrer la couleur d'un code couleur (hexa)",
  categ: "UTILITY",
  author: "Mizari"
}
