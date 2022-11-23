const { ApplicationCommandOptionType } = require("discord.js");

const client = require("../index");
const colors = require('../fonctions/colors.js');

client.on("interactionCreate", async (interaction) => {
  if (!interaction.guild) {
    return interaction.reply("Can't do commands in PM :/");
  }

  // Slash Command Handling
  if (interaction.isChatInputCommand()) {
    //await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.commandsFiles.get(interaction.commandName);
    if (!cmd)
      return interaction.followUp({ content: "An error has occured " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction, args);

    // Logs
    console.log(`[ ${colors.FgCyan}slash-cmd${colors.Reset}  ]\tauthor : ${interaction.user.username}\n\t\tguild : ${interaction.guild.name}\n\t\tcmd : ${interaction.commandName}\n\t\targs : ${args}`);
  }

  // Context Menu Handling
  else if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.commandsFiles.get(interaction.commandName);
    if (command) command.run(client, interaction);

    // Logs
    console.log(`[${colors.FgCyan}context-menu${colors.Reset}]\tauthor : ${interaction.user.username}\n\t\tguild : ${interaction.guild.name}\n\t\tcmd : ${interaction.commandName}`);
  }

  else if (interaction.isModalSubmit()){
    await interaction.deferReply({ ephemeral: true });
    const command = client.commandsFiles.get(interaction.customId);
    if (command) command.run(client, interaction);

    // Logs
    console.log(`[${colors.FgCyan}   modal    ${colors.Reset}]\tauthor : ${interaction.user.username}\n\t\tguild : ${interaction.guild.name}\n\t\tcmd : ${interaction.commandName}`);
  }
});
