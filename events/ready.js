module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`); //affichage dans la console que le client est bien co (c'est pour Mizari)
  client.user.setActivity(`${client.MARQUE} | ${client.PREFIX}help`, {type: 'STREAMING', url: "https://www.twitch.tv/warriorsarmyoff"}); //set le statut du bot en stream avec l'url de notre chaîne twitch
}
