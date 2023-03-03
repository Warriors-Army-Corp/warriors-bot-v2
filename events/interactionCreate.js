const { ApplicationCommandOptionType } = require("discord.js");
const client = require("../index");
const colors = require('../fonctions/colors.js');

client.on("interactionCreate", async (interaction) => {
  if (!interaction.guild) {
    return interaction.reply("Can't do commands in PM :/");
  }

  // Slash Command Handling
  if (interaction.isChatInputCommand()) {

    const cmd = client.commandsFiles.get(interaction.commandName);
    if (!cmd)
      return interaction.reply({ content: "An error has occured", ephemeral: true });

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

  // Modal Handling
  else if (interaction.isModalSubmit()){
    //await interaction.deferReply({ ephemeral: true });
    const command = client.commandsFiles.get(interaction.customId);
    if (command) command.run(client, interaction);

    // Logs
    console.log(`[${colors.FgCyan}   modal    ${colors.Reset}]\tauthor : ${interaction.user.username}\n\t\tguild : ${interaction.guild.name}\n\t\tmodal : ${interaction.customId}`);
  }

  // Button Handling
  else if (interaction.isButton()){
    //await interaction.deferReply({ ephemeral: true });
    const btn = client.commandsFiles.get(interaction.customId);
    if (btn) btn.run(client, interaction);

    //Logs
    console.log(`[${colors.FgCyan}   button   ${colors.Reset}]\tauthor : ${interaction.user.username}\n\t\tguild : ${interaction.guild.name}\n\t\tbtn : ${interaction.customId}`);
  }

  // Select Handling
  else if (interaction.isStringSelectMenu()){
    //await interaction.deferReply({ ephemeral: true });
    const select = client.commandsFiles.get(interaction.customId);
    if (select) select.run(client, interaction);

    //Logs
    console.log(`[${colors.FgCyan}   select   ${colors.Reset}]\tauthor : ${interaction.user.username}\n\t\tguild : ${interaction.guild.name}\n\t\tselect : ${interaction.customId}`);
  }
});
