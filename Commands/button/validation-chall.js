/*
 * author : Mizari (Mizari-W)
 */
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { Client, LogLevel } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

module.exports = {
  name: "validation_btn",
  type: "Button",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async(client, interaction) => {

    // création du modal
    let modal = new ModalBuilder({
      title: "Challenge Validation",
      customId: "validation_modal",
      components: [
        new ActionRowBuilder({
          components: [
            new TextInputBuilder({
              label: "Flag",
              customId: "flag",
              placeholder: "Submit the flag",
              style: TextInputStyle.Short,
              required: true
            })
          ]
        })
      ]
    });

    // id de la db
    var db_id = "95fba5ee-8580-49e3-8d2a-6fdfef29762b";
    // on cherche le membre dans le scoreboard
    var memberResponse = await notion.databases.query({
      database_id: db_id,
      filter: {
        property: 'MemberId',
        text: {
          contains: interaction.user.id
        }
      }
    });

    if (memberResponse.results.length > 0){
      db_id = "4cbba861-b8a3-41b2-ac3d-39da419ea4a4";
      // on cherche le thread dans la db
      var challResponse = await notion.databases.query({
        database_id: db_id,
        filter: {
          property: 'ThreadID',
          text: {
            contains: interaction.channel.id
          }
        }
      });
      if (challResponse.results.length > 0){
        var challPageId = challResponse.results[0].id;

        if (memberResponse.results[0].properties.Challenges.relation.find(chall => chall.id === challPageId)){
          interaction.reply({ content: "You already did this challenge", ephemeral: true });
        } else {
          if (interaction.channel.ownerId === interaction.user.id){
            let page = challResponse.results[0];
            if (page.properties.FirstBlood.rich_text.length === 0){
              interaction.reply({ content: "Please wait for the First Blood", ephemeral: true });
            } else {
              try {
                // apparission du modal
                interaction.showModal(modal);
              } catch(err) {
                interaction.reply({ content: "Something went wrong... Please retry :/", ephemeral: true });
                //Logs
                console.log(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ Le modal a planté ???`);
              }
            }
          } else {
            try {
              // apparission du modal
              interaction.showModal(modal);
            } catch(err) {
              interaction.reply({ content: "Something went wrong... Please retry :/", ephemeral: true });
              //Logs
              console.log(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ Le modal a planté ???`);
            }
          }
        }
      } else {
        interaction.reply({ content: "Something went wrong..." });
      }
    } else {
      // apparission du modal
      interaction.showModal(modal);
    }
  }
}
