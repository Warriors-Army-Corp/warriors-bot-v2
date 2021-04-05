// pour faire des requêtes https
const https = require("https");
// appel des RichEmbed du package discord.js
const { MessageEmbed } = require('discord.js');
// appel du Menu du package discord.js-menu
const { Menu } = require('discord.js-menu');

exports.cmd = (client, msg, args) => {
  const pseudo = args.join("%20"); // on récupère le pseudo

  console.log(pseudo);

  // les options pour l'API
  var options = {
    hostname: "api.www.root-me.org",
    path: "/auteurs?nom="+pseudo,
    headers: {
      "Cookie": "api_key="+require("../config.json").ROOTME_KEY
    }
  }

  // 1ère requête
  https.get(options, res => {
    // récupération du JSON
    var data = '';
    res.on('data', chunk => {
      data+=chunk;
    });

    res.on('end', () => {
      console.log(data);
    });
  // gestion d'erreur
  }).on('error', e => {
    console.error(e);
  });
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "root-me",
  args: "[pseudo Root-Me]",
  desc: "Donne des infos sur un profil Root-ME."
}
