const { MessageEmbed, WebhookClient } = require('discord.js');

exports.cmd = async (client, msg, args) => {
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
          const reason = args.join(" ");
          await member.createDM().then(ch => ch.send(`Vous avez été frappé par le banhammer, asséné part ${msg.author.tag}, pour la raison : "${reason}".`)).catch(msg.reply("Je n'est pas pu envoyer de message à la personne banni :/"))await js;
          await member.ban(`${msg.author.tag} a banni ${victime} pour la raison : ${reason}`)
          await msg.channel.send(`${victime} s'est prit un violant coup de banhammer sur la tête de la part de ${msg.author}`);
          await hook.send(`${msg.author} a banni ${victime} pour la raison : "${reason}"`);
          /*const embed = new RichEmbed({
            "embeds": [
              {
                "title": "Nouveau banni",
                "color": 1,
                "image": {
                  "url": "https://media.discordapp.net/attachments/664493039410085899/741425878759768064/telechargement.jpg"
                }
              }
            ]
          }).setDescription(`${msg.author.tag} a banni ${victime} pour la raison : "${reason}"`).setAuthor(`${msg.author.tag}`, `${msg.author.avatarURL}`)*/
          //hook.send(embed);
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
