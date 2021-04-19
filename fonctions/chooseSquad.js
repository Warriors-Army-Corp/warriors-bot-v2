// pour ajouter le rôle choisi il faut déjà choisir le rôle
async function addRoleSquad(mbr) {
  // on fait un array avec les points
  var points = await [mbr.squad.viking, mbr.squad.spartiate, mbr.squad.samourai];
  // on prend la squad qui a le plus de points (si y a égalité ce sera le premier dans l'array flemme de gérer)
  switch (points.indexOf(Math.max(...points))) {
    // si c viking
    case 0:
      // on add le rôle viking
      await mbr.roles.add('771760851379552256');
      // on met le nom de la squad à "Viking"
      mbr.squad.squad.name = await "Viking";
      // on met le blason viking comme url
      mbr.squad.squad.url = await "https://media.discordapp.net/attachments/771762305096351789/771848238772387840/vikings1.png";
      break;
    // si c spartiate
    case 1:
      // on add le rôle spartiate
      await mbr.roles.add('771760962440396823');
      // on met le nom de la squad à "Spartiate"
      mbr.squad.squad.name = await "Spartiate";
      // on met le blason spartiate comme url
      mbr.squad.squad.url = await "https://media.discordapp.net/attachments/771763839959302164/772052378978877470/a_2.png";
      break;
    // si c samourai
    case 2:
      // on add le rôle samourai
      await mbr.roles.add('771761000834793472');
      // on met le nom de la squad à "Samourai"
      mbr.squad.squad.name = await "Samourai";
      // on met le blason samourai comme url
      mbr.squad.squad.url = await "https://media.discordapp.net/attachments/771763711526043718/771848530511003658/miza.png";
  }
}

module.exports = async function chooseSquad(mbr) {
  // si il a déjà le rôle viking
  if (mbr.roles.cache.find(rl => rl.id === "771760851379552256")){
    // on lui retir
    await mbr.roles.remove("771760851379552256");
    // et on ajoute le rôle choisi
    await addRoleSquad(mbr);
  // sinon si il a le rôle spartiate
  } else if (mbr.roles.cache.find(rl => rl.id === "771760962440396823")) {
    // on lui retir
    await mbr.roles.remove("771760962440396823");
    // et on ajoute le rôle choisi
    await addRoleSquad(mbr);
  // sinon si il a le rôle samourai
  } else if (mbr.roles.cache.find(rl => rl.id === "771761000834793472")) {
    // on lui retir
    await mbr.roles.remove("771761000834793472");
    // et on ajoute le rôle choisi
    await addRoleSquad(mbr);
  // sinon
  } else {
    // on lui ajoute juste le rôle choisi
    await addRoleSquad(mbr);
  }
}
