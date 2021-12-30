const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const colors = require('../fonctions/colors.js');

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        // iter each guild where the client is
        await client.guilds.cache.each(async guild => {
          //await console.log(`[${colors.FgGreen}   Guild    ${colors.Reset}]\t${guild.name}`);
          // for each guild, set all commands
          await guild.commands.set(arrayOfSlashCommands).catch(console.error(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ guild : ${guild.name}`));

          // find all commands which is removed by default
          // var commands = await guild.commands.cache.filter(cmd => cmd.defaultPermission === false);
          // // iter all these commands
          // await commands.each(async cmd => {
          //   // logs
          //   await console.log(`[${colors.FgYellow}  Command   ${colors.Reset}]\t⚠️ ${cmd.name} ⚠️`);
          //
          //   // set the perm data to all these commands
          //   cmd.perm = await arrayOfSlashCommands.find(slashcmd => slashcmd.name === cmd.name).perm;
          //   // find all roles with the perm needed by the command
          //   var roles = await guild.roles.cache.filter(rl => rl.permissions.has(cmd.perm));
          //   // iter all these roles
          //   await roles.each(async role => {
          //     // set the permission for these roles
          //     await cmd.permissions.add({permissions: [{id: role.id, type: 'ROLE', permission: true}]}).then(() => console.log(`[${colors.FgGreen}    Done    ${colors.Reset}]\t✅ role : ${role.name}\n\t\trole id : ${role.id}\n\t\tcommand : ${cmd.name}\n\t\tguild : ${guild.name}`)).catch(err => console.log(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ role : ${role.name}\n\t\trole id : ${role.id}\n\t\tcommand : ${cmd.name}\n\t\tguild : ${guild.name}\n\t\terror : ${err}`));
          //   });
          // });
        });
    });
};
