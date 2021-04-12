// fonction pour renvoyer l'hexa d'un caractère unicod (c'était pour un test mais je la garde au cas ou)
module.exports = function stringToHex(str) {
  res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = str.charCodeAt(i).toString(16);
  }
  return res.join(" ");
}
