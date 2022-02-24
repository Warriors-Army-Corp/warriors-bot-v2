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
  name: "set",
  description: "Config your server",
  options: [
    {
      name: "welcome-message",
      description: "Set a welcome message to your server",
      type: "SUB_COMMAND",
      options: [
        {
          name: "message",
          description: "The welcome message to send",
          type: "STRING",
          required: true
        },
        {
          name: "channel",
          description: "The channel to send to (the message will be send in private if not set)",
          type: "CHANNEL",
          required: false
        }
      ]
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

      // la config du serv se fait sur le message de bienvenue
      if (args[0] === "welcome-message"){
        const msg = args[1]; // le message de bienvenue
        var channel = "DM"; // par défaut le message s'envoie en DM

        // si l'utilisateur a défini un salon
        if (args[2]){
          channel = interaction.guild.channels.cache.get(args[2]);
          // on check que le salon est un salon textuel
          if (channel.type != "GUILD_TEXT" && channel.type != "GUILD_NEWS"){
            // si s'en est pas un on le dit et on abandonne tout
            interaction.followUp({ content : "⚠️ Le salon ne peut pas être autre chose qu'un salon textuel." });
            return;
          // sinon on récupère l'id
          } else {
            channel = args[2];
          }
        }

        // l'id de la DB
        const db_id = 'c1dfe4dd-f812-4f06-b98a-b63a81252912';
        // on regarde si y a pas déjà une config pour ce serv
        var response = await notion.databases.query({
          database_id: db_id,
          filter: {
            property: 'GuildID',
            text: {
              contains: interaction.guild.id
            }
          }
        });

        // si y en a pas
        if(response.results.length === 0){
          // on créé une config
          response = await notion.pages.create({
            parent: {
              database_id: db_id
            },
            icon: {
              type: 'external',
              external: {
                url: interaction.guild.iconURL({ dynamic: false })
              }
            },
            properties: {
              GuildID: {
                title: [
                  {
                    text: {
                      content: interaction.guild.id
                    }
                  }
                ]
              },
              Message: {
                rich_text: [
                  {
                    text: {
                      content: msg
                    }
                  }
                ]
              },
              SalonID: {
                rich_text: [
                  {
                    text: {
                      content: channel
                    }
                  }
                ]
              }
            }
          });

          if(response.object === "page"){
            const embed = new MessageEmbed({
              title: `✅ Fait`,
              color: '#2F3136',
              description: `Votre message a bien été configuré comme message de bienvenue.`,
              fields: [
                {
                  name: "message",
                  value: msg,
                  inline: true
                },
                {
                  name: "salon",
                  value: channel!="DM"?`<#${channel}>`:channel,
                  inline: true
                }
              ]
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
        // si y en a une
        } else {
          // on update la config
          const pageId = response.results[0].id;
          response = await notion.pages.update({
            page_id: pageId,
            properties: {
              Message: {
                rich_text: [
                  {
                    text: {
                      content: msg
                    }
                  }
                ]
              },
              SalonID: {
                rich_text: [
                  {
                    text: {
                      content: channel
                    }
                  }
                ]
              }
            }
          });

          if(response.object === "page"){
            const embed = new MessageEmbed({
              title: `✅ Fait`,
              color: '#2F3136',
              description: `Votre message a bien été configuré comme message de bienvenue.`,
              fields: [
                {
                  name: "message",
                  value: msg,
                  inline: true
                },
                {
                  name: "salon",
                  value: channel!="DM"?`<#${channel}>`:channel,
                  inline: true
                }
              ]
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
        }
      }

    } else {
      interaction.followUp({ content: "Il faut la permission \"Gérer le serveur\" pour pouvoir faire ça." })
    }
  }
}