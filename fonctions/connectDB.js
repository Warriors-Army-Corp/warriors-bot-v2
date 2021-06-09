const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports = (){
  connection.connect(function(err) {
    if (err) {
      console.error("connection à la DB fail : "+err);
      return;
    }
    console.log("connection à la DB réussi");
  });

  return connect;
}
