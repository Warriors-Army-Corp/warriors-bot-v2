const client = require("../index");
const colors = require('../fonctions/colors.js');
const { Client, LogLevel } = require("@notionhq/client");
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  LogLevel: LogLevel.Debug
});

client.on("threadDelete", async (thread) => {
  if (!["1078322593871974471", "1083314009786290186"].includes(thread.parentId)) return;

  // id de la db
  db_id = "4cbba861-b8a3-41b2-ac3d-39da419ea4a4";
  // on cherche le thread dans la db
  var response = await notion.databases.query({
    database_id: db_id,
    filter: {
      property: 'ThreadID',
      text: {
        contains: thread.id
      }
    }
  });

  if (response.results.length > 0){
    // on delete le chall
    const pageId = response.results[0].id;
    response = await notion.pages.update({
      page_id: pageId,
      archived: true
    });
  }

  //Logs
  console.log(`[${colors.FgRed}Chall Remove${colors.Reset}]\ttitle : ${thread.name}\n\t\tid : ${thread.id}`);
});
