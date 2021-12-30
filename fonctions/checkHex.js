module.exports = function checkHex(arg) {
  if (arg.length === 6) {
    for (var i = 0; i < arg.length; i++) {
      var char = arg.charCodeAt(i);
      if (char < 97) {
        if (char < 48 || char > 57) {
          return false
        }
      } else if (char > 102) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
