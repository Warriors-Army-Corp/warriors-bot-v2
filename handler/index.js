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

    // Commands
    const commandsFiles = await globPromise(
        `${process.cwd()}/Commands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    commandsFiles.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.commandsFiles.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;

        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        client.application.commands.set(arrayOfSlashCommands);
    });
};
