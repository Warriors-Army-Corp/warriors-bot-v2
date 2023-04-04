/*
 * author : Mizari (Mizari-W)
 */

 const { Client, LogLevel } = require("@notionhq/client")
 const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ChannelType, PermissionsBitField, resolveColor, hyperlink } = require('discord.js');

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

module.exports = {
  name: "server-config",
  description: "Config your server",
  options: [
    {
      name: "set",
      description: "Set a config",
      options: [
        {
          name: "welcome-message",
          description: "Set a welcome message to your server",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "message",
              description: "The welcome message to send",
              type: ApplicationCommandOptionType.String,
              required: true
            },
            {
              name: "channel",
              description: "The channel to send to (the message will be send in private if not set)",
              type: ApplicationCommandOptionType.Channel,
              channelTypes: [ChannelType.GuildText, ChannelType.GuildNews],
              required: false
            }
          ]
        },
        {
          name: "welcome-role",
          description: "Set a role to automaticaly add to a new member (takes care to member ship screening)",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "role",
              description: "The role to add",
              type: ApplicationCommandOptionType.Role,
              required: true
            }
          ]
        }
      ],
      type: ApplicationCommandOptionType.SubcommandGroup
    },
    {
      name: "remove",
      description: "Remove a config for your server",
      options: [
        {
          name: "welcome-message",
          description: "Remove the welcome message",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "welcome-role",
          description: "Remove the welcome role",
          type: ApplicationCommandOptionType.Subcommand
        }
      ],
      type: ApplicationCommandOptionType.SubcommandGroup
    }
  ],
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: PermissionsBitField.Flags.ManageGuild,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    var grp = interaction.options._group;
    var sub = interaction.options._subcommand;
    args = interaction.options._hoistedOptions;

    if (grp === "set") {

      var db_id = ""; // init
      switch (sub) {
        // Config pour le message de bienvenue
        case "welcome-message":

          const msg = args.find(arg => arg.name === "message").value; // le message de bienvenue
          var channel = args.find(arg => arg.name === "channel");
          channel = channel!==undefined?channel.value:"DM"; // si y a un salon défini on prent ça, sinon c'est en DM

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
              const embed = new EmbedBuilder({
                title: `✅ Fait`,
                color: resolveColor('#2F3136'),
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
              const embed = new EmbedBuilder({
                title: `❌ Erreur`,
                color: resolveColor('#2F3136'),
                description: `Une erreur est survenue. Veuillez en faire par au staff sur le ${hyperlink("serveur support", "https://discord.gg/tDWF64AYkW", "Warriors Projects | W")}.`
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
              const embed = new EmbedBuilder({
                title: `✅ Fait`,
                color: resolveColor('#2F3136'),
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
              const embed = new EmbedBuilder({
                title: `❌ Erreur`,
                color: resolveColor('#2F3136'),
                description: `Une erreur est survenue. Veuillez en faire par au staff sur le ${hyperlink("serveur support", "https://discord.gg/tDWF64AYkW", "Warriors Projects | W")}.`
              });
              interaction.followUp({ embeds: [embed] });
            }
          }

          break;
        // COnfig pour le rôle de bienvenue
        case "welcome-role":
          if (interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)){
            const role = args.find(arg => arg.name === "role").role;
            if (role.editable) {
              if (!role.managed) {
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
                              content: role.id
                            }
                          }
                        ]
                      }
                    }
                  });

                  if(response.object === "page"){
                    const embed = new EmbedBuilder({
                      title: `✅ Fait`,
                      color: resolveColor('#2F3136'),
                      description: `Le rôle a bien été configuré pour être attribué à l'arrivé d'un nouveau membre.`,
                      fields: [
                        {
                          name: "rôle",
                          value: `${role}`
                        }
                      ]
                    });
                    interaction.followUp({ embeds: [embed] });
                  } else {
                    const embed = new EmbedBuilder({
                      title: `❌ Erreur`,
                      color: resolveColor('#2F3136'),
                      description: `Une erreur est survenue. Veuillez en faire par au staff sur le ${hyperlink("serveur support", "https://discord.gg/tDWF64AYkW", "Warriors Projects | W")}.`
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
                              content: role.id
                            }
                          }
                        ]
                      }
                    }
                  });

                  if(response.object === "page"){
                    const embed = new EmbedBuilder({
                      title: `✅ Fait`,
                      color: resolveColor('#2F3136'),
                      description: `Le rôle a bien été configuré pour être attribué à l'arrivé d'un nouveau membre.`,
                      fields: [
                        {
                          name: "role",
                          value: `${role}`
                        }
                      ]
                    });
                    interaction.followUp({ embeds: [embed] });
                  } else {
                    const embed = new EmbedBuilder({
                      title: `❌ Erreur`,
                      color: resolveColor('#2F3136'),
                      description: `Une erreur est survenue. Veuillez en faire par au staff sur le ${hyperlink("serveur support", "https://discord.gg/tDWF64AYkW", "Warriors Projects | W")}.`
                    });
                    interaction.followUp({ embeds: [embed] });
                  }
                }
              } else {
                const embed = new EmbedBuilder({
                  title: `❌ Erreur`,
                  color: resolveColor('#2F3136'),
                  description: `Vous ne pouvez pas choisir un rôle auto-généré (rôle de bot ou boosters).`
                });

                interaction.followUp({ embeds: [embed] });
              }
            } else {
              const embed = new EmbedBuilder({
                title: `❌ Erreur`,
                color: resolveColor('#2F3136'),
                description: `Je ne peux pas gérer ce rôle. Veuillez en choisir un autre ou me mettre au-dessus de celui-ci.`
              });

              interaction.followUp({ embeds: [embed] });
            }
          } else {
            const embed = new EmbedBuilder({
              title: `❌ Erreur`,
              color: resolveColor('#2F3136'),
              description: `Il me faut la permission "gérer les rôles".`
            });
            interaction.followUp({ embeds: [embed] });
          }
          break;
      }

    } else {

      var db_id = ""; // init
      switch (sub) {
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
              const embed = new EmbedBuilder({
                title: `✅ Fait`,
                color: resolveColor('#2F3136'),
                description: `Le message de bienvenue a bien été supprimé.`
              });
              interaction.followUp({ embeds: [embed] });
            } else {
              const embed = new EmbedBuilder({
                title: `❌ Erreur`,
                color: resolveColor('#2F3136'),
                description: `Une erreur est survenue. Veuillez en faire par au staff sur le ${hyperlink("serveur support", "https://discord.gg/tDWF64AYkW", "Warriors Projects | W")}.`
              });
              interaction.followUp({ embeds: [embed] });
            }
          // si y en a pas
          } else {
            // on le dit
            const embed = new EmbedBuilder({
                title: `❌ Hum...`,
                color: resolveColor('#2F3136'),
                description: `Il n'y a aucune config pour ce serveur 🤔`
              });
            interaction.followUp({ embeds: [embed] });
          }

          break;
        // Config pour le rôle de bienvenue
        case "welcome-role":
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
              const embed = new EmbedBuilder({
                title: `✅ Fait`,
                color: resolveColor('#2F3136'),
                description: `Plus aucun rôle ne sera délivrer à l'arrivé d'un nouveau membre.`
              });
              interaction.followUp({ embeds: [embed] });
            } else {
              const embed = new EmbedBuilder({
                title: `❌ Erreur`,
                color: resolveColor('#2F3136'),
                description: `Une erreur est survenue. Veuillez en faire par au staff sur le ${hyperlink("serveur support", "https://discord.gg/tDWF64AYkW", "Warriors Projects | W")}.`
              });
              interaction.followUp({ embeds: [embed] });
            }
          }else {
            const embed = new EmbedBuilder({
                title: `❌ Hum...`,
                color: resolveColor('#2F3136'),
                description: `Il n'y a aucune config pour ce serveur 🤔`
              });
            interaction.followUp({ embeds: [embed] });
          }

          break;

      }

    }

  }
}
