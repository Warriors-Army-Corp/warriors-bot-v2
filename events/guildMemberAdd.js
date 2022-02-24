const client = require("../index")
 const { Client, LogLevel } = require("@notionhq/client")

 // Initializing a client
 const notion = new Client({
   auth: process.env.NOTION_TOKEN,
   LogLevel: LogLevel.Debug
 });

client.on("guildMemberAdd", async (member) => {
  const guild = member.guild;
  if (guild.features.find(feature => feature === "MEMBER_VERIFICATION_GATE_ENABLED") == undefined){
    // l'id de la DB
    const db_id = 'c1dfe4dd-f812-4f06-b98a-b63a81252912';
    var response = await notion.databases.query({
      database_id: db_id,
      filter: {
        property: 'GuildID',
        text: {
          contains: guild.id
        }
      }
    });

    if(response.results.length > 0){
      const page = response.results[0];

      var channel = page.properties.SalonID.rich_text[0].plain_text;
      var msg = page.properties.Message.rich_text[0].plain_text;

      msg = msg.replaceAll("[server.name]", guild.name);
      msg = msg.replaceAll("[server.description]", guild.description);
      msg = msg.replaceAll("[member.name]", member.user.username);
      msg = msg.replaceAll("[member.tag]", member.user.tag);
      msg = msg.replaceAll("[member]", member);
      msg = msg.replaceAll("\\n", String.fromCharCode(10));

      if (channel === "DM") {
        member.send(msg);
      } else {
        guild.channels.cache.get(channel).send(msg);
      }
    }
  }
});
