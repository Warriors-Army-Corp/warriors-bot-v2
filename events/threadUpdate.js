const client = require("../index");
const colors = require('../fonctions/colors.js');
const { ActionRowBuilder, ButtonBuilder } = require("discord.js");


client.on("threadUpdate", async (oldTh, newTh) => {
  if (["1078322593871974471", "1083314009786290186"].includes(newTh.parentId) && newTh.archived){
    newTh.setArchived(false, "Réouverture du challenge");
  }
});
