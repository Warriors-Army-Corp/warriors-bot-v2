const client = require("../index");
const { WebhookClient } = require("discord.js");

client.on("messageCreate", async (message) => {

    if (message.guild.id === "645239930896908293" && message.channel.id === "833710821833441360"){
      if (message.author.id === "1035580588280774687" || message.author.id === "1035580650377461770"){
        const webhook = new WebhookClient({id: "1038048951401713725", token: "WP7ucuABwc6TDOfulGPe_CTxXUfj5VpoxiWE-kwVZCOVxGtYZfwJfQdEfpwNu0TUe4Jd" });
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
    if (message.guild.id === "766621570155675670" && (message.content.endsWith("quoi") || message.content.endsWith("quoi?") || message.content.endsWith("quoi ?"))){
      message.reply("ffffffffffffffffffffffffffffffffffffffffffffffffffeur");
    }
});
