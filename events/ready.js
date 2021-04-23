const fetch = require('node-fetch');

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`); //affichage dans la console que le client est bien co (c'est pour Mizari)

  var count = 0;
  setInterval(async () => {
    if(count > 4)
      count = 0;
    switch (count) {
      case 0:
        var followers = await fetch("https://api.twitch.tv/kraken/channels/440161668/follows?limit=1", {
          method: "get",
          headers: {
            "Client-ID": process.env.TWITCH_ID,
            "Accept": "application/vnd.twitchtv.v5+json"
          }
        }).then(res => res.json()).then(json => json._total).catch();
        client.user.setActivity(`${followers} followers | WarriorsArmyOff on Twitch`, {type: 'STREAMING', url: "https://www.twitch.tv/warriorsarmyoff"});
        break;
      case 1:
        var subscribers = await fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCwlbtfVO3ilb1g1_ZcBhwnQ&key="+process.env.YOUTUBE_KEY).then(res => res.json()).then(json => json.items[0].statistics.subscriberCount).catch();
        client.user.setActivity(`${subscribers} subscribers | Warriors Army on YouTube`, {type: 'WATCHING'});
        break;
      case 2:
        client.user.setActivity(`${client.PREFIX}help | ${client.MARQUE}`, {type: 'PLAYING'});
        break;
      case 3:
        client.user.setActivity("WAC song", {type: 'LISTENING'});
        break;
      case 4:
        client.user.setActivity(`${client.guilds.cache.size} servers`, {type: 'COMPETING'});
        break;
      default:
        console.log("y a un problème chef");
        client.user.setActivity("error", {type: 'PLAYING'});
    }
    count++;
  }, 10000);

}
