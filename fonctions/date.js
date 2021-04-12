//fonction pour formater les dates
module.exports = function DATE(date){
  // jour
  var j = `${date.getDate()}`;
  j = j.length<2?`0${j}`:j;

  // mois
  var m = `${date.getMonth()+1}`;
  m = m.length<2?`0${m}`:m;

  // année
  var a = `${date.getFullYear()}`;

  // on renvoit le tout
  return `${j}/${m}/${a}`;
}
