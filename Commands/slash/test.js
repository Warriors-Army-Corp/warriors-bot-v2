/*
 * author : Mizari (Mizari-W)
 */

module.exports = {
  name: "test",
  description: "Delete some messages",
  // options: [
  //   {
  //     name: "number",
  //     description: "The number of messages you want to delete",
  //     type: "INTEGER",
  //     required: true
  //   }
  // ],
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    console.log(interaction.guild.channels.cache.get("702545113378190095"));
    interaction.followUp({ content: "✅" });
  }
}
