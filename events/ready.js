const fetch = require('node-fetch');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}!`); //affichage dans la console que le client est bien co (c'est pour Mizari)
  client.user.setActivity(`${client.guilds.cache.size} servers`, {type: 'COMPETING'}); //affiche sur combien de serv est le bot

  connection.connect(function(err) {
    if (err) {
      console.error("connection à la DB fail : "+err);
      return;
    }
    console.log("connection à la DB réussi");
  });

  client.guilds.cache.each(guild => {
    var id = guild.id;
    connection.query(`SELECT id FROM guild WHERE id=${id}`, function(err, results){
      if (err) {
        console.error("J'arrive pas à chercher le serveur "+id+" : "+err);
        return;
      }

      if(results.length === 0){
        connection.query(`INSERT INTO guild (id) VALUES('${id}')`, function(err){
          if (err) {
            console.error(`J'arrive pas à insérer le serveur ${id} : ${err}`);
            return;
          }

          console.log("Insertion réussi");
        })
      }
    });
  });

}
