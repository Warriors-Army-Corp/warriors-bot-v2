/*
 * author : Mizari (Mizari-W)
 */
const { ActionRowBuilder, StringSelectMenuBuilder, ComponentType, StringSelectMenuOptionBuilder, EmbedBuilder, resolveColor } = require("discord.js");
const { Client, LogLevel } = require("@notionhq/client");
const colors = require('../../fonctions/colors.js');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

module.exports = {
  name: "validation_modal",
  type: "Modal",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async(client, interaction) => {
    await interaction.deferReply({ ephemeral: true }).catch(err => console.error(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ `+err));
    var userFlag = interaction.components[0].components[0].value;
    const isCTF = interaction.channel.appliedTags.find(id => id === '1085176985258557491');

    // id de la db
    var db_id = "4cbba861-b8a3-41b2-ac3d-39da419ea4a4";
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
      // on update le chall
      const properties = challResponse.results[0].properties;
      const flag = properties.Flag.rich_text[0].plain_text;

      if (userFlag === flag){
        let score = properties.Difficulty.rich_text[0].plain_text;
        score = isCTF!==undefined?(score==="easy"?10:(score==="middle"?20:30)):(score==="easy"?5:(score==="middle"?10:15));
        let firstBlood = properties.FirstBlood.rich_text;

        await interaction.followUp({ content: `Good job! You win ${score} points from this challenge! 🥳 ${firstBlood.length===0?"And firstblooded the challenge 😱":""}`});

        var embed = interaction.message.embeds[0]
        if (embed.fields.length === 2){
          embed = await new EmbedBuilder({
            title: interaction.channel.name,
            color: resolveColor('#2B2D31'),
            fields: [
              {
                name: embed.fields[0].name,
                value: embed.fields[0].value,
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
                value: firstBlood.length === 0?"None":firstBlood[0].plain_text,
                inline: true
              },
              {
                name: "🚩 Last Flagger",
                value: "None",
                inline: true
              }
            ]
          });
        }

        // firstBlood
        if (firstBlood.length === 0){
          const pageId = challResponse.results[0].id;
          await notion.pages.update({
            page_id: pageId,
            properties: {
              FirstBlood: {
                rich_text: [
                  {
                    text: {
                      content: interaction.user.username
                    }
                  }
                ]
              }
            }
          });

          embed.data.fields[3].value = interaction.user.username;
        }

        embed.data.fields[1].value = `${properties.ScoreBoard.relation.length+1}`;
        embed.data.fields[4].value = interaction.user.username;
        let button = interaction.message.components[0];

        interaction.message.edit({ embeds: [embed], components: [button] });

        // id de la db
        db_id = "95fba5ee-8580-49e3-8d2a-6fdfef29762b";
        // on cherche le membre dans le scoreboard
        memberResponse = await notion.databases.query({
          database_id: db_id,
          filter: {
            property: 'MemberId',
            text: {
              contains: interaction.user.id
            }
          }
        });

        if (memberResponse.results.length === 0){
          // on créé le membre dans le scoreboard
          await notion.pages.create({
            parent: {
              database_id: db_id
            },
            properties: {
              MemberId: {
                title: [
                  {
                    text: {
                      content: interaction.user.id
                    }
                  }
                ]
              },
              Score: {
                number: score
              },
              Challenges: {
                relation: [
                  {
                    id: challResponse.results[0].id
                  }
                ]
              }
            }
          });
        } else {
          const oldScore = memberResponse.results[0].properties.Score.number;
          const allChallenges = memberResponse.results[0].properties.Challenges.relation;
          allChallenges.push({ id: challResponse.results[0].id })

          // on update le membre dans le scoreboard
          const pageId = memberResponse.results[0].id;
          await notion.pages.update({
            page_id: pageId,
            properties: {
              Score: {
                number: oldScore + score
              },
              Challenges: {
                relation: allChallenges
              }
            }
          });
        }
      } else {
        await interaction.followUp({ content: "It's not the good flag... try again!" });
      }
    } else {
      await interaction.followUp({ content: "Something went wrong..." });
    }
  }
}
