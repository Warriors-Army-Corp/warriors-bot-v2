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
          channelTypes: ["GUILD_TEXT", "GUILD_NEWS"],
          required: false
        }
      ]
    },
    {
      name: "welcome-role",
      description: "Set a role to automaticaly add to a new member",
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: "The role to add",
          type: "ROLE",
          required: true
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

      var db_id = ""; // init
      switch (args[0]) {
        // Config pour le message de bienvenue
        case "welcome-message":

          const msg = args[1]; // le message de bienvenue
          var channel = args[2]?args[2]:"DM"; // si y a un salon défini on prent ça, sinon c'est en DM

          // l'id de la DB
          db_id = 'c1dfe4dd-f812-4f06-b98a-b63a81252912';
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
                  url: interaction.guild.iconURL()!==null?interaction.guild.iconURL({ dynamic: false }):"https://cdn.discordapp.com/emojis/638828154978304010.png"
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

          break;
        // COnfig pour le rôle de bienvenue
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

          if(response.results.length === 0){
            response = await notion.pages.create({
              parent: {
                database_id: db_id
              },
              icon: {
                type: 'external',
                external: {
                  url: interaction.guild.iconURL()!==null?interaction.guild.iconURL({ dynamic: false }):"https://cdn.discordapp.com/emojis/638828154978304010.png"
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
                RoleID: {
                  rich_text: [
                    {
                      text: {
                        content: roleID
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
                description: `Le rôle a bien été configuré pour être attribué à l'arrivé d'un nouveau membre.`,
                fields: [
                  {
                    name: "rôle",
                    value: `${interaction.guild.roles.cache.get(roleID)}`
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
          } else {
            const pageId = response.results[0].id;
            response = await notion.pages.update({
              page_id: pageId,
              properties: {
                RoleID: {
                  rich_text: [
                    {
                      text: {
                        content: roleID
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
                description: `Le rôle a bien été configuré pour être attribué à l'arrivé d'un nouveau membre.`,
                fields: [
                  {
                    name: "role",
                    value: `${interaction.guild.roles.cache.get(roleID)}`
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
          break;

      }

    } else {
      interaction.followUp({ content: "Il faut la permission \"Gérer le serveur\" pour pouvoir faire ça." })
    }
  }
}
