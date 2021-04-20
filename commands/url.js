// importation des modules requis
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.cmd = async (client, msg, args) => {
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
      "title": "URL SHORTENER",
      "description": `Votre URL courte : ${resp.link}`,
      "footer": {
        "text": "Co-développée avec Osiris"
      }
    });
    // on envoit l'embed
    msg.channel.send(URLEmbed);
  // si ça s'est pas bien passé
  }else {
    // y a de fortes chances que ce soit parce que l'utilisateur n'a pas donnée d'url en paramètre
    msg.channel.send("Il me faut une URL.");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "shorte-url",
  args: "[URL]",
  desc: "Raccourcit une URL.",
  categ: "UTILITY",
  author: "Osiris"
}
