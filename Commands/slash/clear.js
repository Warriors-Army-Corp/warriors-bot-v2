/*
 * author : Mizari (Mizari-W)
 */
const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Delete some messages",
  options: [
    {
      name: "number",
      description: "The number of messages you want to delete",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      max_value: 50
    }
  ],
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: PermissionsBitField.Flags.ManageMessages,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    if (interaction.guild.members.resolve(client.user).permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      const num = args[0]+1;
      interaction.channel.bulkDelete(num, true);
    } else {
      interaction.followUp({ content: "Je ne peux pas supprimer des messages, il me faut la permission \"Gérer les messages\"" });
    }
  }
}
