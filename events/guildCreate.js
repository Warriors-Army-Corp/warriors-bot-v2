const colors = require('../fonctions/colors.js');
const client = require("../index");
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

client.on("guildCreate", async (guild) => {
  client.user.setActivity(`${client.guilds.cache.size} servers |  use "/"`, {type: 'COMPETING'});

  // Slash Commands
  const slashCommands = await globPromise(
      `${process.cwd()}/SlashCommands/*/*.js`
  );

  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
      const file = require(value);
      if (!file?.name) return;

      if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
      arrayOfSlashCommands.push(file);
  });
  await guild.commands.set(arrayOfSlashCommands).catch(err => console.error(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ guild : ${guild.name}\n\t\terror : ${err}`));

  // mise en page des logs dans la console (ça c'est pour Mizari)
  console.log(`[${colors.FgGreen}    Serv    ${colors.Reset}]\tNew serv : ${guild.name}`);
  console.log(`\t\tNombre de membres : ${guild.memberCount}`);
  console.log(`\t\tOwner : ${guild.members.cache.get(guild.ownerId).user.username}`);
});
