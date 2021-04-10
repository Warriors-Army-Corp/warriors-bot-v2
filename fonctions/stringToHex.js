module.exports = (str) => {
  res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] += str.charCodeAt(i).toString(16);
  }
  return res.join(" ");
}
