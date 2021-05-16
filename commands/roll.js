exports.cmd = (client, msg, args) => {
  // initialisation des variables
  var max = 6;
  var min = 0;
  var nbr = 1;

  // si l'utilisateur a mis des paramètres personnalisés
  if (args.length > 0) {
    // si le premier paramètre vaut 0 (ou moins) c'est soit qu'il ne veut pas le changer, soit qu'il a mit de la merde
    // Math.random ne mets que 17 chiffres après la virgules donc on peut pas aller plus loin que 100 000 000 000 000 000
    max = (args[0] && parseInt(args[0])>0 && parseInt(args[0])<=100000000000000000)?parseInt(args[0]):6;
    // si le deuxième paramètre vaut 0 (ou moins) c'est soit qu'il ne veut pas le changer, soit qu'il a mit de la merde
    min = (args[1] && parseInt(args[1])>0)?parseInt(args[1]):0;
    // si le troisième paramètre vaut 0 (ou moins) c'est soit qu'il ne veut pas le changer, soit qu'il a mit de la merde
    // pour éviter les raids et respecter le cooldown de Discord, on ne peut lancer que 5 dés en même temps.
    nbr = (args[2] && parseInt(args[2])>0 && parseInt(args[2])<=5)?parseInt(args[2]):1;
  }

  // si le débile d'utilisateur a mit un max inférieur au min, alors on les inverse
  if (max < min) {
    var temp = max;
    max = min;
    min = temp;
  }

  // on boucle autant de fois que l'utilisateur a demandé de dés (1 fois par défaut)
  for (var i = 0; i < nbr; i++) {
    msg.channel.send(`🎲dé n°${i+1}🎲 : ${Math.floor(Math.random() * (max-min)) + (min+1)}`);
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "roll",
  args: "(max min nombre_de_dés)",
  desc: "Lancez un dé (ou plusieurs, 5 max) de la taille de votre choix (6 par défaut, maximum 100 000 000 000 000 000).\nPour ne pas changer un paramètre mettez le à 0 (si vous ne voulez rien changer ne mettez rien).",
  categ: "FUN",
  author: "Mizari"
}
