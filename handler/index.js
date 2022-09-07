const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const colors = require('../fonctions/colors.js');

const globPromise = promisify(glob);
const cmdType = {
  "CHAT_INPUT": 1,
  "USER": 2,
  "MESSAGE": 3
}
const optType = {
  "SUB_COMMAND": 1,
  "SUB_COMMAND_GROU": 2,
  "STRING": 3,
  "INTEGER": 4,
  "BOOLEAN": 5,
  "USER": 6,
  "CHANNEL": 7,
  "ROLE": 8,
  "MENTIONNABLE": 9,
  "NUMBER": 10,
  "ATTACHEMENT": 11
}

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

        file.type = cmdType[file.type];
        if (file.options){
          for (var i = 0; i < file.options.length; i++) {
            if (file.options[i].type === "SUB_COMMAND" && file.options[i].options) {
              for (var j = 0; j < file.options[i].options.length; j++) {
                file.options[i].options[j].type = optType[file.options[i].options[j].type];
              }
            }
            file.options[i].type = optType[file.options[i].type];
          }
        }

        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        client.application.commands.set(arrayOfSlashCommands);
    });
};
