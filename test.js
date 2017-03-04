// var daum_politics =  require("./lib/daum_politics.js")
// // var daum_politics = daum.daum_politics
// daum_politics(1, function(data){
//   console.log(data)
// })

function getTimeStamp() {
  var d = new Date();

  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
}



function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

function checkday(timestamp, wrtime){
  var a = timestamp.split(' ')
  a = a[1].split(':')
  console.log(a)
  var b = parseInt(a[0])*60+parseInt(a[1])
  var c = wrtime.split(':')
  console.log(c)
  var d = parseInt(c[0])*60 + parseInt(c[1])
  var e = timestamp.split(' ')
  var f = []
  console.log(b);
  console.log(d);
  if (b>=d){
    console.log(1)
    f.push(e[0]);
    var g = [c[0],c[1]];
    g = g.join(':')
    f.push(g);
    console.log(f);
    wrtime = f.join(' ');
  }else{
    console.log(2)
    // console.log('!!!!!!!!!!')
    new_e = e[0].split('-');
    // console.log(new_e);
    new_e[2] ='0'+(parseInt(new_e[2])-1).toString();
    // console.log(new_e);
    e =  new_e.join('-');
    // console.log(e);
    f.push(e);
    var g = [c[0],c[1]];
    g = g.join(':')
    f.push(g);
    // console.log(f);
    wrtime = f.join(' ');
  }
  console.log(wrtime)
}
var a = getTimeStamp()
checkday(a, '15:20')
