/*
 * authors : Osiris (Laelith-Security) & Mizari (Mizari-W)
 */

 // importation des packages requis
 const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, resolveColor } = require('discord.js');
 const fetch = require('node-fetch');

module.exports = {
  name: "ip-infos",
  description: "Show informations about an IP adress",
  options: [
    {
      name: "ip",
      description: "The IP adress you want to know some informations",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    // requête sur l'API avec l'IP passée en paramètre
    const resp = await fetch(`http://ip-api.com/json/${args[0]}?fields=isp,as,org,country,countryCode,regionName,city,zip,proxy,hosting,status`).then(r => r.json()).catch();

    // si la commande a réussi
    if (resp.status === "success") {
      // on crée un embed avec toutes les infos de l'IP
      let Geo = new EmbedBuilder({
        "color": resolveColor('#2F3136'),
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
          "text": "La localisation IP n'est jamais précise"
        }
      });

      // on send l'embed
      interaction.followUp({ embeds: [Geo] });
    // si la commande n'a pas réussi
    }else {
      // on dit à l'utilisateur ce dont on a besoin pour que ça se passe bien
      interaction.followUp({ content: "Il faut que vous donniez une adresse IP publique." });
    }
  }
}
