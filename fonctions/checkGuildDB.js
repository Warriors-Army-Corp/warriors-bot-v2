const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports = (id) =>{
  connection.connect(function(err) {
    if (err) {
      console.error("connection à la DB fail : "+err);
      return;
    }
    console.log("connection à la DB réussi");
  });

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
}
