// importation des packages dont on a besoin
const { MessageEmbed, WebhookClient } = require('discord.js');

exports.cmd = (client, msg, args) => {
  // on stock l'auteur dans une variable c'est plus pratique
  const auteur = msg.member;
  // on prépare un webhook pour les logs
  const hook = new WebhookClient('805089116559114241', 'SL7TWCCwMgsEW10BzMx75acfv85ThpcjOI5KLMPBrFHaglgQM3DZjky7jLtia9KqEeBx');

  // si l'auteur a les perms de ban
  if (auteur.hasPermission('BAN_MEMBERS')){

    // on cherche la première personne mentionnée dans le message
    const user = msg.mentions.users.first();
    // si y en a bien une
    if (user) {
      // on cherche le membre correspondant sur le serv
      const member = msg.guild.member(user);
      // si on l'trouve
      if (member) {
        // on regarde si la personne peut être ban
        if (member.bannable) {
          // on save le tag de la victime dans une constante ça va servir plus tard
          const victime = user.tag;
          // on supprime le premier élément des paramètres (qui est la personne mentionnée)
          args.shift();
          // on garde le reste dans une variable (c'est la raison du ban)
          var reason = args.join(" ");
          // si y a une raison on la garde, si y en a pas on dit "aucune raison"
          reason = (reason === "" ? "aucune raison" : reason);
          // on créé un DM avec la victime et on lui envoit la raison de son ban et qui l'a ban
          member.createDM().then(dm => {
            dm.send(`Vous avez été frappé par le banhammer, asséné part ${msg.author.tag}, pour la raison : "${reason}".`).then(
              // ensuite on ban la personne
              member.ban({ reason: `${msg.author.tag} a banni ${victime} pour la raison : ${reason}`}).then(
                // on confirme dans le channel que la personne a été ban
                msg.channel.send(`${victime} s'est prit un violent coup de banhammer sur la tête de la part de ${msg.author}`).then(
                  // on send le webhook pour les logs (c'est pas ouf pour l'instant ce sera patch plus tard)
                  hook.send({
                    "embeds": [{
                      "title": "NOUVEAU BAN",
                      "color": 16711680,
                      "author": {
                        "name": `BANNEUR : ${msg.author.tag}`,
                        "icon_url": msg.author.displayAvatarURL()
                      },
                      "thumbnail": {
                        "url": user.displayAvatarURL()
                      },
                      "fields": [{
                        "name": "Victime",
                        "value": victime
                      },
                      {
                        "name": "Raison",
                        "value": reason
                      }]
                    }]
                    // gestion d'erreur, c un peu de la merde mais bref
                  }).catch(console.error("pas réussi à evoyer le webhook")), console.error("pas réussi à envoyer la confirmation dans le salon")
                ), console.error("pas réussi à ban")
              ), console.error("pas réussi à envoyer de message")
            )
          }, console.error("pas réussi à créer de DMs"));
        // si la personne est pas bannable on l'dit
        } else {
          msg.reply("J'peux pas l'ban 😑");
        }
      // si on a pas réussi à trouver la personne sur le serv on l'dit
      } else {
        msg.reply("J'le trouve pas sur le serv celui là 🤔");
      }
    // si on a mentionné personne on l'dit
    } else {
      msg.reply("Faut mentionner quelqu'un grokon");
    }

  // si la personne a pas la perm de ban on s'fou de sa gueule
  } else {
    msg.reply("att att... takru tavé la perm ? aaaaaah jui mort ! eh les gars ! c'bouffon a cru il pouvait m'utiliser pour ban mdr jpp");
  }

}

exports.help = {
  perm: "BAN_MEMBERS",
  cmd: "ban",
  args: "[ping] (raison du ban)",
  desc: "Permet de bannir un membre.",
  categ: "MODERATION",
  author: "Mizari"
}
