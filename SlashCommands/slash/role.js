/*
 * author : Mizari (Mizari-W)
 */
 const { MessageEmbed } = require("discord.js");
 const date = require("../../fonctions/date.js");

module.exports = {
  name: "role-infos",
  description: "Display informations about a role",
  options: [
    {
      name: "role",
      description: "The role you want to display informations about",
      type: "ROLE",
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
    const role = interaction.guild.roles.cache.get(args[0]);

    const roleEmbed = new MessageEmbed({
      color: role.color,
      title: "Infos sur "+role.name,
      thumbnail: { url: "https://media.discordapp.net/attachments/661396307973242894/830494635301273640/Capture_decran_2021-04-10_a_19.28.51.png?width=498&height=498" },
      fields: [
        {
          name: "ID",
          value: `${role.id}`,
          inline: true
        },
        {
          name: "Membres",
          value: `${role.members.size}`,
          inline: true
        },
        {
          name: "Création",
          value: date(role.createdAt),
          inline: true
        },
        {
          name: "Dissocié ?",
          value: role.hoist?"✅":"❌",
          inline: true
        },
        {
          name: "Mentionnable ?",
          value: role.mentionable?"✅":"❌",
          inline: true
        },
        {
          name: "Auto généré ?",
          value: role.managed?"✅":"❌",
          inline: true
        }
      ]
    });

    interaction.followUp({ embeds: [roleEmbed] });
  }
}
