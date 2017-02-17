// for (var i = 0 ;   i<10 ; i++){
  // console.log(i);
// }

var merge = function(a,b){
  var resultObj = {}
  for (var i in b){
    a[i] = b[i]
  }
  resultObj = a
  return resultObj
}

 var a = {a: "abc", b: "abfd"}
 var b = {c: "abc", d: "abfd"}
console.log(merge(a,b))


var list = []
for(i = 0; i<30; i++){
  list[i] = i
}
console.log(list)
