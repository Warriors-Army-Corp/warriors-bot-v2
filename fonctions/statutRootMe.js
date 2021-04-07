module.exports = function statut(statut) {
  switch (statut) {
    case "0minirezo":
      return "Admin";
    case "1comite":
      return "Contributeur";
    case "5pre":
      return "Premium";
    case "6forum":
      return "Visiteur";
    default:
      return "???";
  }
}
