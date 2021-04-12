module.exports = async function getRoles(roles) {
  allRoles = [];
  await roles.each(async rl => {
    if (rl.rawPosition !== 0) {
      await allRoles.push(`<@&${rl.id}>`);
    }
  });
  return allRoles.join(" ");
}
