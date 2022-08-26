# Warriors Bot
[Le bot des Warriors, 100% dev par la communauté](https://discord.com/api/oauth2/authorize?client_id=591655828348731422&permissions=8&scope=bot%20applications.commands)

## Comment participer au développement du bot ?
Vous pouvez y participer de différentes manières :
* En documentant le code non documenté
* En corrigeant du code (patch de bugs, optimisation du code, ...)
* En codant ou proposant de nouvelles fonctionnalités pour le bot

### La documentation
La documentation c'est les commentaire dans le code. Si vous voyez un code sans commentaire mais que vous arrivez à comprendre le code, vous pouvez proposer une documentation en faisant une "Pull Request".

### Correction de code
Si vous trouvez un bug, vous pouvez le signaler en créant une "Issue", ou alors vous pouvez la patcher vous même et proposer votre correction en faisant une "Pull Request". Vous pouvez regarder les "Issues" et proposer un patch pour une "Issue". Si vous faites une "Pull Request" n'oubliez pas d'indiquer en commentaire en haut du code, le bug que vous avez patch, et de mettre un commentaire descriptif à l'endroit du patch. Cela marche également pour les proposition d'optimisation.

### Nouvelles fonctionnalités
Vous pouvez proposer de nouvelles fonctionnalités dans les "Issues" ou alors coder une nouvelle fonctionnalité et la proposer dans les "Pull Request" en suivant ce model :
```javascript
/*
 * author : votre nom/pseudo
 */

// appel des packages nécessaire
// exemple :
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nom de la commande",
  description: "description de la commande",
  // facultatif
  options: [
    {
      name: "nom de l'option",
      description: "description de l'option",
      type: "TYPE_DE_L'OPTION",
      required: true // ou false
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
    // code a exécuter à l'appel de cette commande
  }
}
```

Pour pouvoir faire des "Pull Request" il faut "Fork" le projet et le modifier dans votre repos.
