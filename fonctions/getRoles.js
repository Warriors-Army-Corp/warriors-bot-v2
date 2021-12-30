module.exports = async function getRoles(roles) {
  // initialisation d'un tableau
  allRoles = [];
  // on parcour les rôles
  await roles.each(async rl => {
    // si c'est pas le rôle "everyone"
    if (rl.rawPosition !== 0) {
      // on ajoute l'id du rôle au tableau
      await allRoles.push(`<@&${rl.id}>`);
    }
  });
  // on return le tableau
  return allRoles.join(" ");
}
