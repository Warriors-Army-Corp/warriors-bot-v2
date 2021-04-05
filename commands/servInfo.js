const { MessageEmbed } = require('discord.js');

exports.cmd = (client, msg) => {
  var roles = 0;
  msg.guild.roles.cache.forEach(owo => {
    roles++;
  });

  var haut = msg.guild.roles.highest;
  var chan = 0;
  var cat = 0;
  var txt = 0;
  var voc = 0;
  msg.guild.channels.cache.forEach(ch => {
    chan++;
    if (ch.type === "category") {
      cat++;
    }else if (ch.type === "voice") {
      voc++;
    }else {
      txt++;
    }
  });

  var hum = 0;
  var bot = 0;
  msg.guild.members.cache.forEach(mbr => {
    if (mbr.user.bot) {
      bot++;
    }else {
      hum++;
    }
  });

  var dateF = require('../fonctions/date.js')(msg.guild.createdAt);

  var servEmbed = new MessageEmbed({
    "title": `INFO SUR LE SERV **${msg.guild.name}**`,
    "color": msg.member.displayColor,
    "thumbnail": {
      "url": msg.guild.iconURL()
    },
    "footer": {
      "icon_url": client.THUMB,
      "text": `Serveur ID : ${msg.guild.id} | ${client.MARQUE}`
    },
    "fields": [
      {
        "name": "Owner",
        "value": msg.guild.owner,
        "inline": true
      },
      {
        "name": "Date de création",
        "value": dateF,
        "inline": true
      },
      {
        "name": "Nombre de rôles",
        "value": `${roles}`,
        "inline": true
      },
      {
        "name": "Plus haut grade",
        "value": `${haut}`,
        "inline": true
      },
      {
        "name": "Nombre de membres",
        "value": `Total : ${msg.guild.memberCount},\nHumains : ${hum}; Bots : ${bot}`,
        "inline": true
      },
      {
        "name": "Nombre de salons",
        "value": `Total : ${chan},\nCatégories : ${cat}\nTextuels : ${txt}; Vocals : ${voc}`,
        "inline": true
      }
    ]
  });

  var roleW = 0;
  if (msg.guild.id === "645239930896908293") {
    const rlW = msg.guild.roles.resolve("703243368335147058")
    rlW.members.each(mbr => {
      roleW++;
    });
    servEmbed.addField("Nombre de Warriors", roleW, true);
  }

  msg.channel.send(servEmbed);
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "servInfo",
  args: "",
  desc: "Permet d'avoir quelques infos sur le serveur."
}
