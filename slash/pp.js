/*
 * author : Mizari (Mizari-W)
 */

module.exports = {
  name: "pp",
  description: "Display your profile picture in large",
  options: [
    {
      name: "user",
      description: "The user you want to display the profile picture",
      type: "USER",
      required: false
    }
  ],
  run: async(client, interaction, args) => {
    // si y a un argument
    if (args.length > 0) {
      // on affiche la pp de la personne mentionnée
      interaction.editReply({ content: interaction.guild.members.cache.get(args[0]).user.avatarURL({dynamic: true})+"?size=4096"});
    // sinon
    } else {
      // on affiche la pp de l'utilisateur
      interaction.editReply({ content: interaction.user.avatarURL({dynamic: true})+"?size=4096"});
    }
  }
}
