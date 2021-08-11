module.exports = (client, msg) => {
  // if (msg.author.bot || (msg.content.indexOf(client.PREFIX) !== 0)) return; //si c'est un bot qui parle ou que le message ne commence pas par le prefix, on s'en occupe pas
  // const args = msg.content.slice(client.PREFIX.length).trim().split(/ +/g); //on liste les paramètres de la commandes
  // const cmd = args.shift().toLowerCase(); //on isole la commande
  //
  // // mise en page des logs dans la console (ça c'est pour Mizari)
  // console.log("-----Logs :------");
  // console.log(`Auteur : ${msg.author.tag}`);
  // console.log(`Commande : ${cmd}`);
  // console.log(`Liste des arguments : ${args}`);
  // console.log(`Sur le serveur : ${msg.guild.name}`);
  // console.log("-----------------\n");
  //
  //
  //
  // if (client.commands.has(cmd)) client.commands.get(cmd).cmd(client, msg, args); //si la commande existe, on éxécute le script correspondant
  //
  // // partie spéciale pour le quizz
  // if (msg.guild.id === "585906194724552706" && cmd === "squad") {
  //   require('../commands-warriors/quizz.js')(client, msg);
  // }
}
