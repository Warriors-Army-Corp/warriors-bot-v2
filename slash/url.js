/*
 * authors : Osiris (Laelith-Security) & Mizari (Mizari-W)
 */

// importation des modules requis
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
  name: "shorten-url",
  description: "Shorten a URL",
  options: [
    {
      name: "url",
      description: "The URL to shorten",
      type: "STRING",
      required: true
    }
  ],
  run: async(client, interaction, args) => {
    // requête pour choper le lien raccourci
    var resp = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'post',
      body:    `{ "long_url": "${args[0]}" }`,
      headers: { 'Authorization': process.env.BITLY_KEY, 'Content-Type': 'application/json' },
    }).then(res => res.json()).catch();

    // si ça s'est bien passé
    if (resp.link) {
      // notre petit embed
      let URLEmbed = new MessageEmbed ({
        title: "URL SHORTENER 🔗",
        description: `Votre URL courte : ${resp.link}`,
        color: "#2F3136"
      });
      // on envoit l'embed
      interaction.followUp({ embeds: [URLEmbed] });
    // si ça s'est pas bien passé
    }else {
      // y a de fortes chances que ce soit parce que l'utilisateur n'a pas donnée d'url en paramètre
      interaction.followUp({ content: "Il me faut une URL." });
    }
  }
}
