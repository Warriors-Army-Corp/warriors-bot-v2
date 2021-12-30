/*
 * author : Mizari (Mizari-W)
 */

module.exports = {
  name: "clear",
  description: "Delete some messages",
  options: [
    {
      name: "number",
      description: "The number of messages you want to delete",
      type: "INTEGER",
      required: true
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
    if (interaction.guild.members.resolve(client.user).permissions.has("MANAGE_MESSAGES")) {
      const num = args[0]+1;
      interaction.channel.bulkDelete(num, true);
    } else {
      interaction.followUp({ content: "Je ne peux pas supprimer des messages, il me fait la permission \"Gérer les messages\"" });
    }
  }
}
