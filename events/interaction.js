const colors = require('../fonctions/colors.js');

module.exports = async (client, interaction) => {
  if (!interaction.guild) return interaction.reply({ content: "Pour le moment je ne fonctionne que sur les serveurs, désolé 🙏" }); // si la commande vient pas d'un serveur on l'oublie
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
  console.log(`[${colors.FgGreen}    Logs    ${colors.Reset}] Auteur : ${interaction.user.tag}`);
  console.log(`               Commande : ${cmd.name}`);
  console.log(`               Liste des arguments : ${args.length>0?args:`${colors.FgRed}none${colors.Reset}`}`);
  console.log(`               Sur le serveur : ${interaction.guild.name}`);



  cmd.run(client, interaction, args); //si la commande existe, on éxécute le script correspondant

  // partie spéciale pour le quizz
  // if (msg.guild.id === "585906194724552706" && cmd === "squad") {
  //   require('../commands-warriors/quizz.js')(client, msg);
  // }
}
