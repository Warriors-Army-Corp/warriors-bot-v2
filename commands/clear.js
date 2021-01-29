module.exports = (client, msg, args) => {
  if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    msg.channel.bulkDelete((args | 0) + 1);
  } else {
    msg.reply("t'as pas les perms deso :/");
  }
}
