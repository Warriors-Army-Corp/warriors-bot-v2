module.exports = async function getRoles(roles) {
  allRoles = [];
  await roles.each(rl => {
    if (rl.rawPosition !== 0) {
      allRoles.push(`<@&${rl.id}>`);
    }
  });
  return allRoles.join(" ");
}
