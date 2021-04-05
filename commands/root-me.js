// pour faire des requêtes https
const https = require("https");
// appel des RichEmbed du package discord.js
const { MessageEmbed } = require('discord.js');
// appel du Menu du package discord.js-menu
const { Menu } = require('discord.js-menu');

exports.cmd = (client, msg, args) => {
  const pseudo = args.join("%20"); // on récupère le pseudo

  // les options pour l'API pour la première requête
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
      var ids = []; // pour stacker les ids
      var nums = [] // pour stocker les numéros
      const json = JSON.parse(data)[0];
      // on parcour le JSON pour récupérer les numéros
      for (const num in json) {
        nums.push(num|0);
      }

      // on stack les ids
      for (var i = 0; i < nums.length; i++) {
        ids.push(json[nums[i]].id_auteur);
      }

      console.log(ids);

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
