const { MessageEmbed, WebhookClient } = require('discord.js');

exports.cmd = (client, msg, args) => {
  const auteur = msg.member;
  const hook = new WebhookClient('765193588241858602', 'q4pOyYociRycIEmzqCqiOc_PwMDJQs1ER6mt7HVxCzYXUblksCk9tbaDHGjyfyyWzSzj');

  if (auteur.hasPermission('BAN_MEMBERS')){

    const user = msg.mentions.users.first();
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        if (member.bannable) {
          const victime = user.tag;
          args.shift();
          var reason = args.join(" ");
          reason = (reason === "" ? "aucune raison" : reason);
          member.createDM().then(dm => {
            dm.send(`Vous avez été frappé par le banhammer, asséné part ${msg.author.tag}, pour la raison : "${reason}".`).then(
              member.ban({ reason: `${msg.author.tag} a banni ${victime} pour la raison : ${reason}`}).then(
                msg.channel.send(`${victime} s'est prit un violent coup de banhammer sur la tête de la part de ${msg.author}`).then(
                  hook.send({
                    "embeds": [
                      {
                        "title": "NOUVEAU BAN",
                        "color": 16711680,
                        "author": {
                          "name": `BANNEUR : ${msg.author.tag}`,
                          "icon_url": msg.author.displayAvatarURL()
                        },
                        "thumbnail": {
                          "url": user.displayAvatarURL()
                        },
                        "fields": [
                          {
                            "name": "Victime",
                            "value": victime
                          },
                          {
                            "name": "Raison",
                            "value": reason
                          }
                        ]
                      }
                    ]
                  }).catch(console.error("pas réussi à evoyer le webhook")), console.error("pas réussi à envoyer la confirmation dans le salon")
                ), console.error("pas réussi à ban")
              ), console.error("pas réussi à envoyer de message")
            )
          }, console.error("pas réussi à créer de DMs"));
        } else {
          msg.reply("J'peux pas l'ban 😑");
        }
      } else {
        msg.reply("J'le trouve pas sur le serv celui là 🤔");
      }
    } else {
      msg.reply("Faut mentionner quelqu'un grokon");
    }

  } else {
    msg.reply("att att... takru tavé la perm ? aaaaaah jui mort ! eh les gars ! c'bouffon a cru il pouvait m'utiliser pour ban mdr jpp");
  }

}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "ban [ping] ([raison du ban])",
  desc: "Permet d'afficher ce message."
}
