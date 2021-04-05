exports.cmd = async (client, msg) => {
  if(msg.guild.id === "645239930896908293"){
    var player = msg.member;
    if (player.kickable && !player.roles.cache.find(rl => rl.id == "649718517310029874")) {
      var roll = Math.floor(Math.random() * (client.ROULETTE)) + 1;
      if (roll === 1) {
        await msg.author.createDM().then(dm => dm.send("Vous avez joué, vous avez perdu :shrug: vous pouvez quand même revenir https://discord.gg/N49Gxsu").catch());
        await player.kick("A perdu à la Roulette Russe").catch();
        await msg.channel.send("Ah! il a perdu :frowning:")
        await (client.ROULETTE = 6);
      } else {
        await msg.channel.send("C'est pas passé loin :hot_face:");
        await (client.ROULETTE--);
      }
      await console.log(`coups restant : ${client.ROULETTE}`);
    } else {
      msg.reply("Je ne peux pas vous kick donc vous ne pouvez pas jouer... désolé Ô grand maître :person_bowing:")
    }
  } else {
    msg.reply("Pas encore disponible désolé :/");
  }
}

exports.help = {
  perm: "SEND_MESSAGES",
  cmd: "roulette",
  args: "",
  desc: "Permet de jouer à la roulette russe."
}