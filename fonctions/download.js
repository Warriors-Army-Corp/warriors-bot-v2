// importation des packages dont on a besoin
const fs = require('fs');
const fetch = require('node-fetch');

module.exports = async function download(url, output) {
  // initialisation d'une variable
  var resp;
  // on essaye de chopper le contenu de l'url
  await fetch(url).then(res => resp = res).catch(() => resp = {ok: false});
  // si ça se passe bien
  if (resp.ok) {
    // on dl l'image
    const buff = await resp.buffer();
    fs.writeFile(output, buff, () => {});
    return true;
  // sinon
  }else {
    // on dit que ça a planté
    return false;
  }
}
