/*
 * author : Mizari (Mizari-W)
 */

const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, resolveColor, hyperlink, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "test",
  description: "Default description",
  options: [
    {
      name: "test_oblige",
      description: "param obligatoire",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "test_param",
      description: "A param",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  type: ApplicationCommandType.ChatInput,
  nameLocalizations: {fr: "test_en_français"},
  descriptionLocalizations: {fr: "Description en français"},
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    interaction.followUp({ embeds: [new EmbedBuilder({ description: hyperlink("link", "https://root-me.org", "RootMe") })] });
    console.log(`locale : ${interaction.locale}`);
  }
}
