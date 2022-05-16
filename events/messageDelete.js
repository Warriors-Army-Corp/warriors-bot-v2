// const client = require("../index");
// const { MessageEmbed } = require('discord.js');
// const colors = require('../fonctions/colors.js');
//
// client.on("messageDelete", async (message) => {
//     if (message.author.bot || !message.guild) return; // si ça vient d'un bot ou que c'est ne MP on s'en occupe pas
//
//     // si y a au moins une mention dans le message supprimé
//     if (message.mentions.users.first() !== undefined){
//
//       // on fait un embed avec l'auteur du message et le contenu du message
//       const embed = new MessageEmbed({
//         author:{
//           name: message.author.username,
//           iconURL: message.author.avatarURL({ dynamic: true })
//         },
//         description: message.content,
//         color: message.member.displayColor,
//         footer:{
//           text: "Anti ghost ping ©️ Warriors Army Corp 2022"
//         }
//       });
//
//       // puis on l'envoi directement dans le salon concerné
//       message.channel.send({ embeds: [embed] });
//
//       // Logs
//       console.log(`[ ${colors.FgCyan}ghost ping${colors.Reset} ]\tauthor : ${message.author.username}\n\t\tcontent : ${message.content}`);
//     }
// });
