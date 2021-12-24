const client = require("../index");
const colors = require('../fonctions/colors.js');

client.on("ready", () =>
    console.log(`[${colors.FgCyan} Connected  ${colors.Reset}]\rLogged in as ${client.user.tag}!`)
);
