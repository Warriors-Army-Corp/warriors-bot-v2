const { glob } = require("glob");
const { promisify } = require("util");
const { Client, ApplicationCommandType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
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

        if ([ApplicationCommandType.Message, ApplicationCommandType.User, ApplicationCommandType.ChatInput].includes(file.type)) arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        client.application.commands.set(arrayOfSlashCommands);


        //const odd = client.guilds.cache.get("706640777450881114");
        //
        // const cmd = {
        //   name: "dev-role",
        //   description: "Envoyez un lien vers un de vos projets si le formulaire s'affiche.",
        //   type: ApplicationCommandType.ChatInput,
        //   /**
        //    *
        //    * @param {Client} client
        //    * @param {CommandInteraction} interaction
        //    * @param {String[]} args
        //    */
        //   run: async(client, interaction, args) => {
        //     if (interaction.user.flags.has(4194304) || interaction.user.flags.has(131072)){
        //       interaction.reply({ content: "Here we go!", ephemeral: true });
        //       interaction.member.roles.add("1045344484126371921");
        //     } else {
        //       const modal = new ModalBuilder({
        //         title: "Claim role",
        //         customId: "claim-role",
        //         components: [
        //           new ActionRowBuilder({
        //             components: [
        //               new TextInputBuilder({
        //                 label: "Link to project",
        //                 customId: "link",
        //                 placeholder: "Donnez moi un lien vers un de vos projets.",
        //                 style: TextInputStyle.Short
        //               })
        //             ]
        //           })
        //         ]
        //       });
        //       interaction.showModal(modal);
        //     }
        //   }
        // }
        //
        // odd.commands.cache.each(cmd => {
        //   console.log(cmd);
        //   cmd.delete().then(() => console.log("deleted"));
        // });
        //client.commandsFiles.set(cmd.name, cmd);
    });
};
