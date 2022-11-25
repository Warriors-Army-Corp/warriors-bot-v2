/*
 * author : Mizari (Mizari-W)
 */
const { ApplicationCommandType, ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "echo",
  description: "Repeat what you want",
  options: [
    {
      name: "message",
      description: "The message you want to repeat",
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  type: ApplicationCommandType.ChatInput,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    // si le bot a la perm d'écrire dans le salon
    if (interaction.channel.permissionsFor(interaction.guild.members.resolve(client.user)).has(PermissionFlagsBits.SendMessages)) {
      // on supprime le reply
      interaction.deleteReply();
      // on envoit le message de l'utilisateur dans le salon (il ne peut rien mentionner à part les users)
      interaction.channel.send({ content: args[0], allowedMentions: { parse: ['users'] } });
    // sinon
    } else {
      // on dit que le bot peut pas envoyer de messages
      interaction.followUp({ content: "Je n'ai pas la permission d'envoyer des messages ici" });
    }
  }
}
