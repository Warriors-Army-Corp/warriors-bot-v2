module.exports = (client, msg, args) => {
  var self = msg.guild.members.find("id", msg.author.id);
  if (self.hasPermission("MANAGE_MESSAGES")) {
    msg.channel.bulkDelete((args | 0) + 1);
  } else {
    msg.reply("t'as pas les perms deso :/");
  }
}
