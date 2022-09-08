/*
 * author : Mizari (Mizari-W)
 */

const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, resolveColor } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "test",
  description: "Default description",
  options: [
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
    interaction.followUp({ content: "✅" });
    let headers = await fetch(args[0]).then(resp => resp.headers).catch(err => console.error(err));
    console.log(headers.get("pouet"));
  }
}
