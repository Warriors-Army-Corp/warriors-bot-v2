const fs = require('fs');
const fetch = require('node-fetch');

module.exports = async function download(url, output) {
  var resp;
  await fetch(url).then(res => resp = res).catch(() => resp = {ok: false});
  if (resp.ok) {
    const buff = await resp.buffer();
    fs.writeFile(output, buff, () => {});
    return true;
  }else {
    return false;
  }
}
