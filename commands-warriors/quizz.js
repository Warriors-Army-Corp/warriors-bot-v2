// appel du Menu du package discord.js-menu
const { Menu } = require('discord.js-menu');
// appel des MessageEmbed du package discord.js
const { MessageEmbed } = require('discord.js');
// appel de la fonction chooseSquad
const chooseSquad = require("../fonctions/chooseSquad.js");

module.exports = async (client, msg) => {
  // on check que la personne qui demande le quizz est un warrior
  if (msg.member.roles.cache.find(rl => rl.id === "643209189971329083")){
    // on récupère le membre dans une variable c'est plus pratique
    var mbr = msg.member;
    // on configure l'objet pour l'utiliser partout dans le code c'est plus pratique
    mbr.squad = {
      viking : 0,
      spartiate : 0,
      samourai : 0,
      squad : {
        name : "none",
        url : "none"
      }
    }

    // on créer le menu
    var quizzEmbed = new Menu(msg.channel, msg.author.id, [
    {
      name: 'question1',
      content: new MessageEmbed({
        title: 'Question 1',
        description: 'Quelles est votre arme préférée ?',
        fields: [
          {
              name: "1️⃣",
              value: "La hache",
              inline: true
          },
          {
              name: "2️⃣",
              value: "Le glaive",
              inline: true
          },
          {
              name: "3️⃣",
              value: "Le katana",
              inline: true
          }
        ]
      }),
      reactions: {
        "1️⃣": ("next", () => {
          mbr.squad.viking ++;
          quizzEmbed.setPage(1);
        }),
        "2️⃣": () => {
          mbr.squad.spartiate ++;
          quizzEmbed.setPage(1);
        },
        "3️⃣": () => {
          mbr.squad.samourai ++;
          quizzEmbed.setPage(1);
        }
      }
    },
    {
      name: 'question2',
      content: new MessageEmbed({
        title: 'Question 2',
        description: 'Quelles est votre plât préférée ?',
        fields: [
          {
              name: "1️⃣",
              value: "Les Pâtes",
              inline: true
          },
          {
              name: "2️⃣",
              value: "Le riz poulet curry t'sais avec la crème fraîche curry là et une salade verte",
              inline: true
          },
          {
              name: "3️⃣",
              value: "Le Risotto",
              inline: true
          }
        ]
      }),
      reactions: {
        "1️⃣": () => {
          mbr.squad.samourai ++;
          quizzEmbed.setPage(2);
        },
        "2️⃣": () => {
          mbr.squad.spartiate ++;
          quizzEmbed.setPage(2);
        },
        "3️⃣": () => {
          mbr.squad.viking ++;
          quizzEmbed.setPage(2);
        }
      }
    },
    {
      name: 'question3',
      content: new MessageEmbed({
        title: 'Question 3',
        description: 'Quelles est votre animal préférée ?',
        fields: [
          {
              name: "1️⃣",
              value: "Les Chat",
              inline: true
          },
          {
              name: "2️⃣",
              value: "Le Loup",
              inline: true
          },
          {
              name: "3️⃣",
              value: "Le Guépard",
              inline: true
          }
        ]
      }),
      reactions: {
        "1️⃣": () => {
          mbr.squad.samourai ++;
          quizzEmbed.setPage(3);
        },
        "2️⃣": () => {
          mbr.squad.viking ++;
          quizzEmbed.setPage(3);
        },
        "3️⃣": () => {
          mbr.squad.spartiate ++;
          quizzEmbed.setPage(3);
        }
      }
    },
    {
      name: 'question4',
      content: new MessageEmbed({
        title: 'Question 4',
        description: 'Quelles est votre style musique préférée ?',
        fields: [
          {
              name: "1️⃣",
              value: "Le Rap",
              inline: true
          },
          {
              name: "2️⃣",
              value: "Le Rock",
              inline: true
          },
          {
              name: "3️⃣",
              value: "La MAO (Musique Assistée par Ordinateur)",
              inline: true
          }
        ]
      }),
      reactions: {
        "1️⃣": () => {
          mbr.squad.spartiate ++;
          quizzEmbed.setPage(4);
        },
        "2️⃣": () => {
          mbr.squad.viking ++;
          quizzEmbed.setPage(4);
        },
        "3️⃣": () => {
          mbr.squad.samourai ++;
          quizzEmbed.setPage(4);
        }
      }
    },
    {
      name: 'question5',
      content: new MessageEmbed({
        title: 'Question 5',
        description: 'Quelles est votre activité préférée ?',
        fields: [
          {
              name: "1️⃣",
              value: "Le montage/art",
              inline: true
          },
          {
              name: "2️⃣",
              value: "L'informatique",
              inline: true
          },
          {
              name: "3️⃣",
              value: "Le sport/gaming",
              inline: true
          }
        ]
      }),
      reactions: {
        "1️⃣": () => {
          mbr.squad.viking ++;
          quizzEmbed.setPage(5);
        },
        "2️⃣": () => {
          mbr.squad.samourai ++;
          quizzEmbed.setPage(5);
        },
        "3️⃣": () => {
          mbr.squad.spartiate ++;
          quizzEmbed.setPage(5);
        }
      }
    },
    {
      name: 'question6',
      content: new MessageEmbed({
        title: 'Question 6',
        description: 'Dans une game en coop vous êtes plutôt ?',
        fields: [
          {
              name: "1️⃣",
              value: "support",
              inline: true
          },
          {
              name: "2️⃣",
              value: "sniper",
              inline: true
          },
          {
              name: "3️⃣",
              value: "tank",
              inline: true
          }
        ]
      }),
      reactions: {
        "1️⃣": async () => {
          await mbr.squad.viking ++;
          await chooseSquad(mbr);
          quizzEmbed.setPage(6);
        },
        "2️⃣": async () => {
          await mbr.squad.spartiate ++;
          await chooseSquad(mbr);
          quizzEmbed.setPage(6);
        },
        "3️⃣": async () => {
          await mbr.squad.samourai ++;
          await chooseSquad(mbr);
          quizzEmbed.setPage(6);
        }
      }
    },
    {
      name: 'squad',
      content: new MessageEmbed({
        title: `Vous êtes dans la squad `,
        description: 'Bienvenue dans votre nouvelle squad jeune guerrier ! '
      })
    }
    ], 300000);

    // on lance le menu
    quizzEmbed.start();

    // quand la page change
    quizzEmbed.on('pageChange', destination => {
      // si on arrive sur la dernière page
      if (destination.name === "squad") {
        // on modifi le titre avec le nom de la squad
        destination.content.title += mbr.squad.squad.name;
        // on modifi la description avec l'émote de la squad
        switch (mbr.squad.squad.name) {
          case "Viking":
            destination.content.description += "<:sipViking:771758857709551641>";
            break;
          case "Spartiate":
            destination.content.description += "<:sipSpart:771758845827612722>";
            break;
          case "Samourai":
            destination.content.description += "<:sipSamourai:771758827297046589>";
            break;
        }
        // on met en image le blason de la squad
        destination.content.image = {url: mbr.squad.squad.url};
        // suivant quel squad a été choisi on envoit un message de Bienvenue dans le salon correspondant
        switch (mbr.squad.squad.name) {
          case "Viking":
            msg.guild.channels.cache.find(ch => ch.id === "771762305096351789").send(`${mbr} Bienvenue dans ta nouvelle squad ! <:sipViking:771758857709551641>`);
            break;
          case "Spartiate":
            msg.guild.channels.cache.find(ch => ch.id === "771763839959302164").send(`${mbr} Bienvenue dans ta nouvelle squad ! <:sipSpart:771758845827612722>`);
            break;
          case "Samourai":
            msg.guild.channels.cache.find(ch => ch.id === "771763711526043718").send(`${mbr} Bienvenue dans ta nouvelle squad ! <:sipSamourai:771758827297046589>`);
            break;
        }
      }
    });

  } else {
    msg.channel.send("Vous n'êtes pas un warrior 🤔");
  }
}
