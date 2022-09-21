const client = require("../index");
 const { Client, LogLevel } = require("@notionhq/client");
 const colors = require('../fonctions/colors.js');

 // Initializing a client
 const notion = new Client({
   auth: process.env.NOTION_TOKEN,
   LogLevel: LogLevel.Debug
 });

client.on("guildMemberAdd", async (member) => {
  const guild = member.guild;
  if (guild.features.find(feature => feature === "MEMBER_VERIFICATION_GATE_ENABLED") == undefined){
    // l'id de la DB
    var db_id = 'c1dfe4dd-f812-4f06-b98a-b63a81252912';
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

    /////////////////////////////////////////////////////////////
    if (guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)){

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
        let role = page.properties.RoleID.rich_text[0].plain_text;
        role = member.guild.roles.cache.get(role);

        if (role == undefined) {
          response = await notion.pages.update({
            page_id: page.id,
            archived: true
          });
        } else if (!role.editable) {
          let chl = null;
          chl = guild.channels.cache.filter(chn => chn.type === ChannelType.GuildText && chn.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.SendMessages)).random();
          const embed = new EmbedBuilder({
            title: `❌ Erreur`,
            color: resolveColor('#2F3136'),
            description: `Il semblerait que je ne peux plus gérer le rôle ${role} 🤔.`
          });
          chl.send({ embeds: [embed] }).catch(err => console.error(`[${colors.FgGreen} ❌ Error   ${colors.Reset}]\tImpossible d'envoyer de message dans un salon + je n'ai pas la perm de gérer le rôle ${role.name} sur ${guild.name}`));
        } else {
          member.roles.add(role).catch(err => console.error(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ guild : ${guild.name}\n\t\terror : ${err}`));
        }
      }
    } else {
      let chl = null;
      chl = guild.channels.cache.filter(chn => chn.type === ChannelType.GuildText && chn.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.SendMessages)).random();
      const embed = new EmbedBuilder({
        title: `❌ Erreur`,
        color: resolveColor('#2F3136'),
        description: `Il semblerait que je n'ai plus la permission de gérer les rôles 🤔.`
      });
      chl.send({ embeds: [embed] }).catch(err => console.error(`[${colors.FgGreen} ❌ Error   ${colors.Reset}]\tImpossible d'envoyer de message dans un salon + je n'ai pas la perm de gérer les rôles sur ${guild.name}`));
    }
  }
});
