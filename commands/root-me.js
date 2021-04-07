// appel des RichEmbed du package discord.js
const { MessageEmbed } = require('discord.js');
// appel du Menu du package discord.js-menu
const { Menu } = require('discord.js-menu');
// appel de fetch pour les requêtes
const fetch = require('node-fetch');
// récupération de la clé d'API
const key = process.env.ROOTME_KEY;
// importantion de la fonction pour afficher correctement un statut
const statut = require('../fonctions/statutRootMe.js');

exports.cmd = async (client, msg, args) => {
  var pseudo = args.join("%20"); // recontitution du pseudo
  var embeds = []; // initialisation du tableau qui contiendra les pages

  if (pseudo !== "") {

    // première requêtes pour chopper les IDs
    var idsResp = await fetch('https://api.www.root-me.org/auteurs?nom='+pseudo, {
      method: 'get',
      headers: {cookie: 'api_key='+key}
    }).then(res => res.json()).then(json => json[0]);

    // si il trouve pas d'user il prévient (le bot trop sympa quoi)
    if (idsResp.error) {
      msg.channel.send("Cet utilisateur n'existe pas.");
    } else {
      // on parcour les IDs pour chopper les profils
      for (id in idsResp) {
        // 2e requête pour récupérer les infos des profils
        var profil = await fetch('https://api.www.root-me.org/auteurs/'+idsResp[id].id_auteur, {
          method: 'get',
          headers: {cookie: 'api_key='+key}
        }).then(res => res.json());

        // on créer les pages embeds des profils et on les stock
        var embed = await {
          name: idsResp[id].id_auteur,
          content: new MessageEmbed({
            "title": "Profil Root-Me de **"+profil.nom+"**",
            "color": 0,
            "footer": {
              "text": "ID de l'utilisateur : "+idsResp[id].id_auteur,
              "icon_url": client.THUMB
            },
            "thumbnail": {
              "url": "https://media.discordapp.net/attachments/661396307973242894/828351018881253376/Root-Me.png"
            },
            "fields": [
              {
                "name": "Statut",
                "value": statut(profil.statut),
                "inline": true
              },
              {
                "name": "Score",
                "value": profil.score!=""?profil.score:"0",
                "inline": true
              },
              {
                "name": "Position",
                "value": profil.position!=""?profil.position:"0",
                "inline": true
              },
              {
                "name": "Challenges créés",
                "value": profil.challenges.length,
                "inline": true
              },
              {
                "name": "Solutions postées",
                "value": profil.solutions.length,
                "inline": true
              },
              {
                "name": "Validations",
                "value": profil.validations.length,
                "inline": true
              }
            ]
          }),
          reactions: {
            '◀': 'previous',
            '▶': 'next'
          }
        }
        await embeds.push(embed);
      }

      // on créer le menu puis on l'affiche
      const embedMenu = new Menu(msg.channel, msg.author.id, embeds, 300000);
      embedMenu.start();
    }
  }else {
    msg.channel.send("Il faut me donner un pseudo pour que je puisse trouver quelqu'un.");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "root-me",
  args: "[pseudo Root-Me]",
  desc: "Donne des infos sur un profil Root-ME."
}
