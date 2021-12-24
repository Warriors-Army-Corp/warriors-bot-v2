const client = require("../index");
const colors = require('../fonctions/colors.js');

client.on("ready", () =>
   console.log(`[${colors.FgCyan} Connected  ${colors.Reset}]\tLogged in as ${client.user.tag}!`)
);
