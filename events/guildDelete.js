module.exports = (client, guild) => {
  client.user.setActivity(`${client.guilds.cache.size} servers | ${client.PREFIX}help`, {type: 'COMPETING'});
}
