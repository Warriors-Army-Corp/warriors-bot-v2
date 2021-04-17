/*
 * author : Osιrιs#3420 (Laelith-Security)
 */

const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.cmd = async (client, msg, args) => {
  const resp = await fetch(`http://ip-api.com/json/${args[0]}?fields=isp,as,org,country,countryCode,regionName,city,zip,proxy,hosting,status`).then(r => r.json()).catch();

  if (resp.status === "success") {
    let Geo = new MessageEmbed({
      "color": msg.member.displayColor,
      "title":`**IP Lookup**`,
      "description":`**__Récupération des informations d'une IP :__**\n
        **Adresse IP** : ${args[0]}
        **ISP** : ${resp.isp}
        **ASN** : ${resp.as}
        **Organisation** : ${resp.org}
        **Pays** : ${resp.country} (${resp.countryCode})
        **Région** : ${resp.regionName}
        **Ville** : ${resp.city}
        **Code postal** : ${resp.zip}\n
        **Proxy** : ${resp.proxy?"Activé":"Désactivé"}
        **Hosting** : ${resp.hosting?"Activé":"Aucun"} `,
      "footer":{
        "text": "La localisation IP n'est jamais précise\ndéveloppé en coopération avec Osiris"
      }
    });

    msg.channel.send(Geo);
  }else {
    msg.channel.send("Il faut que vous donniez une adresse IP publique.");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "ip",
  args: "[adresse IP]",
  desc: "Donne des infos sur une adresse IP."
}
