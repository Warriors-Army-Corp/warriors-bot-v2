/*
 * author : Mizari (Mizari-W)
 */
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const colors = require('../../fonctions/colors.js');

module.exports = {
  name: "chall_btn",
  type: "Button",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async(client, interaction) => {
    if (interaction.channel.ownerId === interaction.user.id){
      // création du modal
      let modal = new ModalBuilder({
        title: "Challenge Configuration",
        customId: "chall_modal",
        components: [
          new ActionRowBuilder({
            components: [
              new TextInputBuilder({
                label: "Flag",
                customId: "flag",
                placeholder: "What is the flag of the challenge ?",
                style: TextInputStyle.Short,
                required: true
              })
            ]
          })
        ]
      });

      try {
        // apparission du modal
        interaction.showModal(modal);
      } catch(err) {
        interaction.reply({ content: "Something went wrong... Please retry :/", ephemeral: true });
        //Logs
        console.log(`[${colors.FgRed}   Error    ${colors.Reset}]\t❌ Le modal a planté ???`);
      }

    } else {
      interaction.reply({ content: "You're note the author of the challenge", ephemeral: true });
    }
  }
}
