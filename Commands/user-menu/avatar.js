const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "avatar",
    type: 'USER',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      const user = await client.users.fetch(interaction.targetId);
        interaction.followUp({ content: user.displayAvatarURL({ dynamic: true, size: 4096}) });
    },
};
