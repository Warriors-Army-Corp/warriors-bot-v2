/*
 * author : Osιrιs#3420 (Laelith-Security)
 */

// importation des packages dont on a besoin
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.cmd = async (client, msg, args) => {
  // requête sur l'API avec l'IP passée en paramètre
  const resp = await fetch(`http://ip-api.com/json/${args[0]}?fields=isp,as,org,country,countryCode,regionName,city,zip,proxy,hosting,status`).then(r => r.json()).catch();

  // si la commande a réussi
  if (resp.status === "success") {
    // on crée un embed avec toutes les infos dont on a besoin
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
        "text": "La localisation IP n'est jamais précise\nco-développée avec Osiris"
      }
    });

    // on send l'embed
    msg.channel.send(Geo);
  // si la commande n'a pas réussi
  }else {
    // on dit à l'utilisateur ce dont on a besoin pour que ça se passe bien
    msg.channel.send("Il faut que vous donniez une adresse IP publique.");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "ip",
  args: "[adresse IP]",
  desc: "Donne des infos sur une adresse IP.",
  categ: "FUN",
  author: "Osiris"
}
