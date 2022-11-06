const client = require("../index");
const { WebhookClient } = require("discord.js");
const colors = require('../fonctions/colors.js');

client.on("messageCreate", async (message) => {

    if (message.guild.id === "645239930896908293" && message.channel.id === "833710821833441360"){
      console.log(`[ ${colors.FgCyan} webhook ${colors.Reset}  ]\tIl se passe des trucs, tiens pour te rassurer le token du webhook ${process.env.TPG_WEBHOOK_TOKEN}`);
      console.log(`\t\tEt voilà le message que j'ai capté ${message.content} de ${message.author.username} ${message.author.bot?"c'est bien un bot":"c'est pas un bot en plus"}`);
      if (message.author.id === "1035580586586275893" || message.author.id === "1035580649169494148"){
        message.attachments.each(at => {
          message.content += `\n${at.url}`;
        });
        const webhook = new WebhookClient({id: "1038053909211656262", token: process.env.TPG_WEBHOOK_TOKEN });
        webhook.send(message.content);
      }
    }

    if (
        message.author.bot ||
        !message.guild
    )
        return;

    if (message.content === "/help"){
      message.reply({content : "If you can't use slashcommands, please kick the bot and invite again with this link : https://discord.com/api/oauth2/authorize?client_id=591655828348731422&permissions=8&scope=bot%20applications.commands"});
    }

    message.content = message.content.trim().toLowerCase();
    const reg = /(quoi+\s*\?*\s*)$/g;
    if (message.guild.id === "645239930896908293" /*"766621570155675670"*/ && reg.test(message.content)){
      message.reply("ffffffffffffffffffffffffffffffffffffffffffffffffffeur");
    }
});
