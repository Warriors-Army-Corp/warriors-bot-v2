const { ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "avatar",
    type: ApplicationCommandType.User,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      interaction.deferReply({ ephemeral: false }).catch(() => {});
      const user = await client.users.fetch(interaction.targetId);
        interaction.followUp({ content: user.displayAvatarURL({ dynamic: true, size: 4096}) });
    },
};
