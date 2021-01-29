//exportation de la fonction
module.exports = function DATE(date){
  //récupération de la date, transforme en chaîne de caractères puis split dans un array
  var day = date.toString().split(" ");
  //le jour c'est la 3e partie de la date
  var jour = day[2];
  //le mois c'est la 2e partie de la date
  var mois = day[1];
  //l'année c'est la 4e partie de la date
  var année = day[3];

  //on transforme le mois en numéro
  switch (mois) {
    case "Jan":
      mois = "01";
      break;
    case "Feb":
      mois = "02";
      break;
    case "Mar":
      mois = "03";
      break;
    case "Apr":
      mois = "04";
      break;
    case "May":
      mois = "05";
      break;
    case "Jun":
      mois = "06";
      break;
    case "Jul":
      mois = "07";
      break;
    case "Aug":
      mois = "08";
      break;
    case "Sep":
      mois = "09";
      break;
    case "Oct":
      mois = "10";
      break;
    case "Nov":
      mois = "11";
      break;
    case "Dec":
      mois = "12";
      break;
    default:
      //au cas ou y a un bug
      mois = "merci de prévenir le dev que y a une erreur mdr";
  }
  //on retourne la date avec des "/" => exemple : 15/04/2020
  return jour + "/" + mois + "/" + année;
}
