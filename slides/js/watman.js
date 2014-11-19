console.warn("WTF?");
var data = new Array(10).join("wat" - 1);
data += [32, 66, 97, 116, 109, 97, 110, 33].map(function(e){
  return String.fromCharCode(e);
}).join("");
console.log({ "Ergebnis": data });