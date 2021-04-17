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

  // commence à écrire pour sinialer que la réponse arrive
  msg.channel.startTyping();

  if (pseudo !== "") {

    // première requêtes pour chopper les IDs
    var idsResp = await fetch('https://api.www.root-me.org/auteurs?nom='+pseudo, {
      method: 'get',
      headers: {cookie: 'api_key='+key}
    }).then(res => res.json()).then(json => json[0]).catch();

    // si il trouve pas d'user il prévient (le bot trop sympa quoi)
    if (idsResp.error) {
      msg.channel.send("Cet utilisateur n'existe pas.");
    } else {

      // compteur pour les pages
      var nbPages = 0;
      for (var i in idsResp) {
        nbPages++;
      }

      var numPage = 0; // pour le numéro de la page
      // on parcour les IDs pour chopper les profils
      for (id in idsResp) {
        // id du profil
        const idUser = idsResp[id].id_auteur;
        // pp du profil
        var img = "https://www.root-me.org/IMG/auton"+idUser+".jpg";
        // checker la pp du profil
        var checkImg = await fetch(img).catch();
        if (!checkImg.ok) {
          checkImg = await fetch("https://www.root-me.org/IMG/auton"+idUser+".png").catch();
          if (checkImg.ok) {
            img = "https://www.root-me.org/IMG/auton"+idUser+".png";
          } else {
            checkImg = await fetch("https://www.root-me.org/IMG/auton"+idUser+".gif").catch();
            if (checkImg) {
              img = "https://www.root-me.org/IMG/auton"+idUser+".gif";
            } else {
              img = "https://www.root-me.org/IMG/auton0.png";
            }
          }
        }

        numPage++; // compter les pages
        // 2e requête pour récupérer les infos des profils
        var profil = await fetch('https://api.www.root-me.org/auteurs/'+idUser, {
          method: 'get',
          headers: {cookie: 'api_key='+key}
        }).then(res => res.json()).catch();

        // on créer les pages embeds des profils et on les stock
        var embed = await {
          name: idUser,
          content: new MessageEmbed({
            "title": "Profil Root-Me de **"+profil.nom+"**",
            "color": 0,
            "footer": {
              "text": "ID de l'utilisateur : "+idUser+"\t\t\t\t\tPage "+numPage+" sur "+nbPages,
              "icon_url": client.THUMB
            },
            "thumbnail": {
              "url": img
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
            '⬅️': 'previous',
            '➡️': 'next'
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

  msg.channel.stopTyping(true);
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "root-me",
  args: "[pseudo Root-Me]",
  desc: "Donne des infos sur un profil [Root-ME](https://www.root-me.org/).",
  categ: "FUN"
}
