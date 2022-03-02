const client = require("../index")
 const { Client, LogLevel } = require("@notionhq/client")

 // Initializing a client
 const notion = new Client({
   auth: process.env.NOTION_TOKEN,
   LogLevel: LogLevel.Debug
 });

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  // si l'ancien pending est différent du nouveau que le nouveau est false
  if(oldMember.pending !== newMember.pending && !newMember.pending){
    // récupération du serv
    const member = newMember;
    const guild = member.guild;
    // l'id de la DB
    var db_id = 'c1dfe4dd-f812-4f06-b98a-b63a81252912';
    // on regarde si y a pas déjà une config pour ce serv
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

      msg = msg.replaceAll("{server.name}", guild.name);
      msg = msg.replaceAll("{server.description}", guild.description);
      msg = msg.replaceAll("{member.name}", member.user.username);
      msg = msg.replaceAll("{member.tag}", member.user.tag);
      msg = msg.replaceAll("{member}", member);
      msg = msg.replaceAll("\\n", String.fromCharCode(10));

      if (guild.channels.cache.get(channel) == undefined){
        channel = "DM";

        response = await notion.pages.update({
          page_id: page.id,
          properties: {
            SalonID: {
              rich_text: [
                {
                  text: {
                    content: channel
                  }
                }
              ]
            }
          }
        });
      }

      if (channel === "DM") {
        member.send(msg);
      } else {
        guild.channels.cache.get(channel).send(msg);
      }
    }

    ///////////////////////////////////////////////////////

    db_id = 'a03bb09931e942b686e5e8c8950af90e';
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
      const role = page.properties.RoleID.rich_text[0].plain_text;

      if (member.guild.roles.cache.get(role) == undefined) {
        response = await notion.pages.update({
          page_id: page.id,
          archived: true
        });
      } else {
        member.roles.add(role);
      }
    }
  }
});
