/*
 * author : Mizari (Mizari-W)
 */
const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "banhammer",
  description: "Ban a member",
  // defaultPermission: false,
  // perm: "BAN_MEMBERS",
  options: [
    {
      name: "user",
      description: "The user you want to ban",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "reason",
      description: "The reason of the ban",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: PermissionsBitField.Flags.BanMembers,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    // vérification que le bot a la perm de ban
    if (interaction.guild.members.resolve(client.user).permissions.has("BAN_MEMBERS")) {
      const userID = args[0]; // l'ID du membre à ban
      const mbr = interaction.guild.members.cache.get(userID); // le membre à ban
      // maintenant on vérifie que la victime est bannable
      if (mbr && mbr.bannable) {
        var reason = "none"; // initialisation de la raison
        // si une raison est donnée on la stock dans "reason"
        if (args.length > 1) {
          reason = args[1];
        }

        // on envoit un message MP à la victime
        await mbr.createDM().then(ch => ch.send(`Vous avez été banni de ${interaction.guild.name} par ${interaction.user.tag} pour la raison "${reason}"`)).catch();
        // on indique que la personne s'est fait ban et on donne l'auteur du ban
        await interaction.followUp({ content: `${mbr.user.tag} s'est pris un violent coup de banhammer sur la tête de la part de ${interaction.user}` });
        // on ban la victime
        await mbr.ban({ reason: `"${reason}" par ${interaction.user.tag}` }).catch();
      // si la victime n'est pas bannable
      } else {
        interaction.followUp({ content : "Je ne peux pas bannir cette personne" });
      }
    // si le bot a pas la perm de ban
    } else {
      interaction.followUp({ content: "J'ai pas la perm de ban..." });
    }
  }
}
