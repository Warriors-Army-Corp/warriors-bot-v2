module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`); //affichage dans la console que le client est bien co (c'est pour Mizari)

  var count = 0;
  setInterval(() => {
    if(count > 4)
      count = 0;
    switch (count) {
      case 0:
        client.user.setActivity("Click \"Watch\" button to see our Twitch channel.", {type: 'STREAMING', url: "https://www.twitch.tv/warriorsarmyoff"});
        break;
      case 1:
        client.user.setActivity(`${client.guilds.cache.size} servers`, {type: 'WATCHING'});
        break;
      case 2:
        client.user.setActivity(`${client.MARQUE} | ${client.PREFIX}help`, {type: 'PLAYING'});
        break;
      case 3:
        client.user.setActivity("WAC song", {type: 'LISTENING'});
        break;
      case 4:
        client.user.setActivity("FC WAC", {type: 'COMPETING'});
        break;
      default:
        console.log("y a un problème chef");
        client.user.setActivity("error", {type: 'PLAYING'});
    }
    count++;
  }, 10000);

}
