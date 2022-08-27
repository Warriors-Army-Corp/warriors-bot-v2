/*
 * author : Mizari (Mizari-W)
 */

 const { Client, LogLevel } = require("@notionhq/client")
 const { MessageEmbed } = require('discord.js');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

module.exports = {
  name: "remove",
  description: "Remove a config for your server",
  options: [
    {
      name: "welcome-message",
      description: "Remove the welcome message",
      type: "SUB_COMMAND"
    },
    {
      name: "welcome-role",
      description: "Remove the welcome role",
      type: "SUB_COMMAND"
    }
  ],
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {

    if (interaction.member.permissions.has("MANAGE_GUILD")) {

      var db_id = ""; // init
      switch (args[0]) {
        // Config pour le message de bienvenue
        case "welcome-message":

          // l'id de la DB
          db_id = 'c1dfe4dd-f812-4f06-b98a-b63a81252912';
          // on regarde si y a une config pour ce serv
          var response = await notion.databases.query({
            database_id: db_id,
            filter: {
              property: 'GuildID',
              text: {
                contains: interaction.guild.id
              }
            }
          });

          // si y en a
          if(response.results.length > 0){
            // on supprime la config
            response = await notion.pages.update({
              page_id: response.results[0].id,
              archived: true
            });

            if(response.object === "page"){
              const embed = new MessageEmbed({
                title: `✅ Fait`,
                color: '#2F3136',
                description: `Le message de bienvenue a bien été supprimé.`
              });
              interaction.followUp({ embeds: [embed] });
            } else {
              const embed = new MessageEmbed({
                title: `❌ Erreur`,
                color: '#2F3136',
                description: `Une erreur est survenue. Veuillez en faire par au staff sur le [serveur support](https://discord.gg/tDWF64AYkW).`
              });
              interaction.followUp({ embeds: [embed] });
            }
          // si y en a pas
          } else {
            // on le dit
            const embed = new MessageEmbed({
                title: `❌ Hum...`,
                color: '#2F3136',
                description: `Il n'y a aucune config pour ce serveur 🤔`
              });
            interaction.followUp({ embeds: [embed] });
          }

          break;
        // Config pour le rôle de bienvenue
        case "welcome-role":
          const roleID = args[1];
          db_id = "a03bb09931e942b686e5e8c8950af90e";

          var response = await notion.databases.query({
            database_id: db_id,
            filter: {
              property: 'GuildID',
              text: {
                contains: interaction.guild.id
              }
            }
          });

          if(response.results.length > 0){
            response = await notion.pages.update({
              page_id: response.results[0].id,
              archived: true
            });

            if(response.object === "page"){
              const embed = new MessageEmbed({
                title: `✅ Fait`,
                color: '#2F3136',
                description: `Plus aucun rôle ne sera délivrer à l'arrivé d'un nouveau membre.`
              });
              interaction.followUp({ embeds: [embed] });
            } else {
              const embed = new MessageEmbed({
                title: `❌ Erreur`,
                color: '#2F3136',
                description: `Une erreur est survenue. Veuillez en faire par au staff sur le [serveur support](https://discord.gg/tDWF64AYkW).`
              });
              interaction.followUp({ embeds: [embed] });
            }
          }else {
            const embed = new MessageEmbed({
                title: `❌ Hum...`,
                color: '#2F3136',
                description: `Il n'y a aucune config pour ce serveur 🤔`
              });
            interaction.followUp({ embeds: [embed] });
          }
          break;

      }

    } else {
      interaction.followUp({ content: "Il faut la permission \"Gérer le serveur\" pour pouvoir faire ça." })
    }
  }
}
