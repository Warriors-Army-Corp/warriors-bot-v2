# Warriors Bot
Le bot des Warriors, 100% dev par la communauté

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
// appel des packages nécessaire
exports.cmd = /*async si besoin*/ (client, msg, args) => {
  // code a executer
  // exemple :
  // msg.channel.send("Hello World !");
}

exports.help = {
  perm: "la permission nécessaire pour utiliser cette commande (mettre SEND_MESSAGES s'il n'y a pas besoin de perm particulière)",
  cmd: "nom de la commande (exemple : say_hello)",
  args: "les paramètres de la commandes (entre [] et entre () si c'est optionnel, ne rien mettre s'il n'y en a pas besoin)",
  desc: "Courte description de la commande"
}
```
