module.exports = (oldMember, newMember) => {
  if(oldMember.guild.id !== '585906194724552706') return; // si c'est pas sur le serv WAC on fait rien (plus tard ce sera étendu à tout le monde)

  // si l'ancien pending est différent du nouveau que le nouveau est false
  if(oldMember.pending !== newMember.pending && !newMember.pending){
    newMember.roles.add('643207799630987299'); // on ajoute le rôle membre
  }
}
