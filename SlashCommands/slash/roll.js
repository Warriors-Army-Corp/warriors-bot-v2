/*
 * author : Mizari (Mizari-W)
 */

module.exports = {
  name: "roll",
  description: "Roll a (or some) dice(s)",
  options: [
    {
      name: "min",
      description: "The minimum value of the dice(s) (1 by default, 1 min)",
      type: "INTEGER",
      required: false
    },
    {
      name: "max",
      description: "The maximum value of the dice(s) (6 by default, 9,007,199,254,740,991 max)",
      type: "INTEGER",
      required: false
    },
    {
      name: "num",
      description: "The number of dice you want to roll (1 by default, max 5)",
      type: "INTEGER",
      required: false
    }
  ],
  type: 'CHAT_INPUT',
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async(client, interaction, args) => {
    // initialisation des variables
    var min = 1;
    var max = 6;
    var num = 1;

    args = interaction.options.array(); // redéfinition des arguments
    // récupération des arguments de l'utilisateur
    for (var i = 0; i < args.length; i++) {
      switch (args[i].name) {
        case "min":
          min = args[i].value;
          break;
        case "max":
          max = args[i].value;
          break;
        case "num":
          num = args[i].value;
          break;
      }
    }

    // si le débile d'utilisateur a mit un max inférieur au min, alors on les inverse
    if (max < min) {
      var temp = max;
      max = min;
      min = temp;
    }

    // initialisation du tableau qui va contenir les dés
    var dices = [];
    // on boucle autant de fois que l'utilisateur a demandé de dés (1 fois par défaut)
    for (var i = 0; i < num; i++) {
      dices.push(`🎲dé n°${i+1}🎲 : ${Math.floor(Math.random() * (max-min)) + (min+1)}`);
    }

    // on envoie les résultat
    interaction.followUp(dices.join("\n"));
  }
}
