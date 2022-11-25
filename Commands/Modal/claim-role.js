/*
 * author : Mizari (Mizari-W)
 */
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "claim-role",
  type: "Modal",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    const link = interaction.components[0].components[0].value;

    let embed = new EmbedBuilder({
      title: "Nouvelle demande de rôle",
      color: parseInt("2F3136", 16),
      thumbnail: {
        url: interaction.user.displayAvatarURL({ dynamic: true, size: 4096 })
      },
      fields: [
        {
          name: "User",
          value: interaction.user.tag
        },
        {
          name: "Link",
          value: link
        }
      ]
    });

    const miza = client.users.cache.get("591248680506359828");
    miza.send({ embeds: [embed] });

    interaction.followUp({ content: "Sent ✅" });
  }
}
