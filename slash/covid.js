// Importation des modules requis
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: "covid",
  description: "Display global or national statistics about COVID19",
  options: [
    {
      name: "country",
      description: "The name of a country (in english)",
      type: "STRING",
      required: false
    }
  ],
  run: async(client, interaction, args) => {
    // Si la commande n'a pas d'argument
    if (args.length === 0){
      // requête de récupération des statistiques mondiales
      var resp = await fetch('https://api.covid19api.com/summary', {
        method: 'get',
      }).then(res => res.json()).catch();

      // Embed des statistiques mondiales
      let CovidEmbed = new MessageEmbed({
        "color": "#2F3136",
        "title":`**COVID-19**`,
        "description":`__Statistiques Mondiales du Covid-19__\n
          Infectés : ${resp.Global.TotalConfirmed}
          Décès : ${resp.Global.TotalDeaths}
          Rétablissements : ${resp.Global.TotalRecovered}\n
          [Ressources & Prévention](https://www.gouvernement.fr/info-coronavirus)`,
          "footer": {
            "text": "Les données ne sont pas toujours précises\nDéveloppée par Osiris et Mizari"
          }
      });
    interaction.followUp({ embeds: [CovidEmbed] });

    } else {
      // Insensibilité à la casse des requêtes
      var country = args[0].toLowerCase();
      country = country.charAt(0).toUpperCase()+country.substr(1)
      // Requêtes de récupération des statistiques par pays
      var respCountry = await fetch(`https://api.covid19api.com/live/country/${country}/status/confirmed`, {
        method: 'get',
      }).then(res => res.json()).catch();
      var respCountryVaccines = await fetch(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${country}`, {
        method: 'get',
      }).then(res => res.json()).catch();
      var respCountryCases = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`, {
        method: 'get',
      }).then(res => res.json()).catch();

      // Calcul du pourcentage de cas de covid-19 pour un pays
      function Pourcentage(){
        var i = 100*`${respCountryCases.All.confirmed}`/`${respCountryCases.All.population}`;
        let res = i.toFixed(1);
        return `${res}`
      }
      // Si la commande a un argument (pays)
      if(respCountry.length > 0){
        // Embed des statistiques par pays
        let CovidCountryEmbed = new MessageEmbed({
          "color": "#2F3136",
          "title":`**COVID-19**`,
          "description":`__Statistiques Nationales du Covid-19__\n
            Pays : ${respCountry[0].Country} (${respCountry[0].CountryCode})
            Infectés : ${respCountryCases.All.confirmed}
            Décès : ${respCountryCases.All.deaths}
            Rétablissements : ${respCountryCases.All.recovered}
            Vaccinés : ${respCountryVaccines.All.people_vaccinated}
            Nombre d'habitants : ${respCountryCases.All.population}\n
            Pourcentage d'habitants infectés : ${Pourcentage()}%`,
            "footer": {
              "text": "Les données ne sont pas toujours précises\nDéveloppée par Osiris et Mizari"
            }
        });
        interaction.followUp({ embeds: [CovidCountryEmbed] });
        // Si le l'argument entré est en français ou n'est pas reconnu comme un pays
      } else {
        interaction.followUp({ content: "Soit le pays n'existe pas, soit vous n'avez pas entré le pays en anglais." });
      }
    }
  }
}
