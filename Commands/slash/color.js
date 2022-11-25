/*
 * author : Mizari (Mizari-W)
 */
// importation des packages qui vont biens
const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const checkHex = require('../../fonctions/checkHex.js');

module.exports = {
  name: "color-infos",
  description: "Send informations about a color",
  options: [
    {
      name: "hexa_code",
      description: "The hexa code of the color you want informations",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    // pour palier aux problèmes de casse, on met tout en minuscule
    const color = args[0].toLowerCase();
    // on fait la requête à l'API qui donne des infos sur les couleurs
    var resp = await fetch("http://www.thecolorapi.com/id?hex="+color).then(res => res.json());

    // si y a pas de couleur ou si la réponse de la requête contient un code d'erreur ou si l'argument n'est pas un code couleur en hexa
    if (!color || resp.code || !checkHex(color)) {
      // on prévient l'utilisateur que y a un problème
      interaction.followUp({ content: "Il faut que vous me donniez un code couleur en hexadécimal (sans `#` au début)." });
    } else {
      // on créé l'embed à partir des infos de la requête
      var colorEmbed = new EmbedBuilder({
        "title": "Infos sur la couleur "+resp.hex.value,
        "color": parseInt(color, 16),
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
      // on envoit l'embed
      interaction.followUp({ embeds: [colorEmbed] });
    }
  }
}
