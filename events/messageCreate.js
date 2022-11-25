const client = require("../index");
const { WebhookClient } = require("discord.js");
const colors = require('../fonctions/colors.js');

client.on("messageCreate", async (message) => {

  if (message.author.bot || !message.guild)
    return;

  if (message.content === "/help"){
    message.reply({content : "If you can't use slashcommands, please kick the bot and invite again with this link : https://discord.com/api/oauth2/authorize?client_id=591655828348731422&permissions=8&scope=bot%20applications.commands"});
  }

  message.content = message.content.trim().toLowerCase();
  const reg = /(quoi+\s*\?*\s*)$/g;
  if (message.guild.id === "766621570155675670" && reg.test(message.content)){
    message.reply("ffffffffffffffffffffffffffffffffffffffffffffffffffeur");
  }
});
