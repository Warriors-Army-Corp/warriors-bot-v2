module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return; //si c'est pas une commande
  await interaction.defer().catch(() => {});
  const cmd = client.slashCommands.get(interaction.commandName); //on récupère la commande
  if (!cmd) return interaction.followUp({ content: "What the fuck ? Y a une erreur 🤔" });
  //on liste les paramètres de la commandes
  const args = [];
  interaction.options.array().map(option => {
    args.push(option.value);
  });

  // mise en page des logs dans la console (ça c'est pour Mizari)
  console.log("-----Logs :------");
  console.log(`Auteur : ${interaction.user.tag}`);
  console.log(`Commande : ${cmd.name}`);
  console.log(`Liste des arguments : ${args}`);
  console.log(`Sur le serveur : ${interaction.guild.name}`);
  console.log("-----------------\n");



  cmd.run(client, interaction, args); //si la commande existe, on éxécute le script correspondant

  // partie spéciale pour le quizz
  // if (msg.guild.id === "585906194724552706" && cmd === "squad") {
  //   require('../commands-warriors/quizz.js')(client, msg);
  // }
}
