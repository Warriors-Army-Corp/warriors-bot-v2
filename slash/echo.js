module.exports = {
  name: "echo",
  description: "Repeat what you want",
  options: [
    {
      name: "message",
      description: "The message you want to repeat",
      type: "STRING",
      required: true
    }
  ],
  run: async(client, interaction, args) => {
    if (interaction.channel.permissionsFor(interaction.guild.members.resolve(client.user)).has("SEND_MESSAGES")) {
      interaction.deleteReply();
      interaction.channel.send({ content: args[0], allowedMentions: { parse: ['users'] } });
    } else {
      interaction.followUp({ content: "Je n'ai pas la permission d'envoyer des messages ici" });
    }
  }
}
