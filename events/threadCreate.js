const client = require("../index");
const colors = require('../fonctions/colors.js');
const { Client, LogLevel } = require("@notionhq/client");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

client.on("threadCreate", async (thread, newlyCreated) => {
  if (!["1078322593871974471", "1083314009786290186"].includes(thread.parentId)) return;

  console.log(thread.appliedTags);

  // id de la db
  db_id = "4cbba861-b8a3-41b2-ac3d-39da419ea4a4";
  // on créé le chall
  response = await notion.pages.create({
    parent: {
      database_id: db_id
    },
    properties: {
      ThreadID: {
        title: [
          {
            text: {
              content: thread.id
            }
          }
        ]
      }
    }
  });


  let button = new ActionRowBuilder({
    components: [
      new ButtonBuilder({
        style: 1,
        label: "Config challenge",
        customId: "chall_btn"
      })
    ]
  });

  thread.send({
    content: "Configure the challenge by clicking the button below.",
    components: [button]
  });

  //Logs
  console.log(`[${colors.FgGreen}  New Chall ${colors.Reset}]\ttitle : ${thread.name}\n\t\tid : ${thread.id}`);
});
