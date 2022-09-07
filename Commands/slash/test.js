/*
 * author : Mizari (Mizari-W)
 */

const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "test",
  description: "Default description",
  options: [
    {
      name: "number",
      description: "A number",
      type: ApplicationCommandOptionType.Number,
      required: true
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
    interaction.followUp({ content: "✅" });
  }
}
