/*
 * author : Mizari (Mizari-W)
 */
const { Client, LogLevel } = require("@notionhq/client");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, resolveColor } = require("discord.js");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

module.exports = {
  name: "score",
  type: "Select",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async(client, interaction) => {
    if (interaction.user.id === interaction.channel.ownerId){
      let score = interaction.values[0];
      const isCTF = interaction.channel.appliedTags.find(id => id === '1085176985258557491');

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
        // on update la config
        const pageId = response.results[0].id;
        response = await notion.pages.update({
          page_id: pageId,
          properties: {
            Difficulty: {
              rich_text: [
                {
                  text: {
                    content: score
                  }
                }
              ]
            }
          }
        });

        const embed = new EmbedBuilder({
          title: interaction.channel.name,
          color: resolveColor('#2B2D31'),
          fields: [
            {
              name: `${score=="easy"?"🟢":(score=="middle"?"🟡":"🔴")} Difficulty`,
              value: score[0].toUpperCase()+score.substring(1)+` (${isCTF!==undefined?(score=="easy"?"10":(score=="middle"?"20":"30")):(score=="easy"?"5":(score=="middle"?"10":"15"))} points)`,
              inline: true
            },
            {
              name: "✅ Validations",
              value: "0",
              inline: true
            },
            {
              name: "",
              value: ""
            },
            {
              name: "🩸 First Blood",
              value: "None",
              inline: true
            },
            {
              name: "🚩 Last Flagger",
              value: "None",
              inline: true
            }
          ]
        });

        let button = new ActionRowBuilder({
          components: [
            new ButtonBuilder({
              style: 3,
              label: "Submit Flag",
              emoji: "🚩",
              customId: "validation_btn"
            })
          ]
        });

        interaction.channel.send({ embeds: [embed], components: [button] });

      }else{
        interaction.reply({ content: "Something went wrong..." });
      }

      interaction.message.delete();
    } else {
      interaction.reply({ content: "You're note the author of the challenge", ephemeral: true});
    }
  }
}
