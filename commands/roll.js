exports.cmd = (client, msg, args) => {
  // random : Math.floor(Math.random() * max) + (min+1);

  var max = 6;
  var min = 0;
  var nbr = 1;

  if (args.length > 0) {
    max = (args[0] && (args[0]|0)>0)?(args[0]|0):6;
    min = (args[1] && (args[1]|0)>0)?(args[1]|0):0;
    nbr = (args[2] && (args[2]|0)>0 && (args[2]|0)<=10)?(args[2]|0):1;
  }

  for (var i = 0; i < nbr; i++) {
    msg.channel.send(`🎲dé n°${i+1}🎲 : ${Math.floor(Math.random() * (max-min)) + (min+1)}`);
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "roll",
  args: "(max min nombre_de_dés)",
  desc: "Lancez un dé (ou plusieurs, 10 max) de la taille de votre choix (6 par défaut)",
  categ: "FUN",
  author: "Mizari"
}
