/*
 * author : Mizari (Mizari-W)
 */
const { ActionRowBuilder, StringSelectMenuBuilder, ComponentType, StringSelectMenuOptionBuilder } = require("discord.js");
const { Client, LogLevel } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

module.exports = {
  name: "chall_modal",
  type: "Modal",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async(client, interaction) => {
    var flag = interaction.components[0].components[0].value;
    interaction.deferReply();

    // id de la db
    db_id = "4cbba861-b8a3-41b2-ac3d-39da419ea4a4";
    // on cherche le thread dans la db
    var response = await notion.databases.query({
      database_id: db_id,
      filter: {
        property: 'ThreadID',
        text: {
          contains: interaction.channel.id
        }
      }
    });

    if (response.results.length > 0){
      // on update le chall
      const pageId = response.results[0].id;
      response = await notion.pages.update({
        page_id: pageId,
        properties: {
          Flag: {
            rich_text: [
              {
                text: {
                  content: flag
                }
              }
            ]
          }
        }
      });

      let select = new ActionRowBuilder({
        components: [
          new StringSelectMenuBuilder({
            customId: "score",
            maxValues: 1,
            minValues: 1,
            options: [
              {
                emoji: "🟢",
                label: "Easy (5 points)",
                value: "easy"
              },
              {
                emoji: "🟡",
                label: "Middle (10 points)",
                value: "middle"
              },
              {
                emoji: "🔴",
                label: "Hard (15 points)",
                value: "hard"
              }
            ],
            placeholder: "Select difficulty"
          })
        ]
      });

      interaction.followUp({ content: "Please select difficulty below", components: [select] });
    } else {
      interaction.followUp({ content: "Something went wrong..." });
    }

    await interaction.message.delete();
  }
}
