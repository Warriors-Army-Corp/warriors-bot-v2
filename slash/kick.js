module.exports = {
  name: "kickhammer",
  description: "Kick a member",
  options: [
    {
      name: "user",
      description: "The user you want to kick",
      type: "USER",
      required: true
    },
    {
      name: "reason",
      description: "The reason of the kick",
      type: "STRING",
      required: false
    }
  ],
  run: async(client, interaction, args) => {
    // vérification que le bot a la perm de kick
    if (interaction.guild.members.resolve(client.user).permissions.has("KICK_MEMBERS")) {
      // vérification que la personne a les permissions de kick
      if (interaction.guild.members.resolve(interaction.user).permissions.has("KICK_MEMBERS")) {
        const userID = args[0]; // l'ID du membre à kick
        const mbr = interaction.guild.members.cache.get(userID); // le membre à kick
        // maintenant on vérifie que la victime est kicknable
        if (mbr && mbr.kickable) {
          var reason = "none"; // initialisation de la raison
          // si une raison est donnée on la stock dans "reason"
          if (args.length > 1) {
            reason = args[1];
          }

          // on envoit un message MP à la victime
          await mbr.createDM().then(ch => ch.send(`Vous avez été expulsé de ${interaction.guild.name} par ${interaction.user.tag} pour la raison "${reason}"`)).catch();
          // on indique que la personne s'est fait kick et on donne l'auteur du kick
          await interaction.followUp({ content: `${mbr.user.tag} s'est prit un violent coup de kickhammer sur la tête de la part de ${interaction.user}` });
          // on kick la victime
          await mbr.kick({ reason: `"${reason}" par ${interaction.user.tag}` }).catch();
        // si la victime n'est pas kicknable
        } else {
          interaction.followUp({ content : "Je ne peux pas kick cette personne" });
        }
      // si la personne n'a pas la perm de kick
      } else {
        interaction.followUp({ content: "att att... takru tavé la perm ? aaaaaah jui mort ! eh les gars ! c'bouffon a cru il pouvait m'utiliser pour kick mdr jpp" });
      }
    // si le bot a pas la perm de kick
    } else {
      interaction.followUp({ content: "J'ai pas la perm de kick..." });
    }
  }
}
