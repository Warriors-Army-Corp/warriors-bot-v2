const mysql = require('mysql');

module.exports = (id, db) =>{

  db.query(`SELECT id FROM guild WHERE id='${id}'`, async function(err, results){
    if (err) {
      console.error("J'arrive pas à chercher le serveur "+id+" : "+err);
      return;
    }

    if(results.length === 0){
      db.query(`INSERT INTO guild (id) VALUES('${id}')`, async function(err){
        if (err) {
          console.error(`J'arrive pas à insérer le serveur ${id} : ${err}`);
          return;
        }

        console.log("Insertion réussi [checkGuild]");
      })
    }
  });

}
