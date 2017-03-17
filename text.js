var moment = require('moment');
//
// var a = moment('2013-01-01');
// var b = moment('2013-06-01');
//
// // If you want an exclusive end date (half-open interval)
// // for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
// //   console.log(m.format('YYYY-MM-DD'));
// // }
//
// // If you want an inclusive end date (fully-closed interval)
// var date_list = [];
// for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
//   date_list.push(m.format('YYYYMMDD'));
// }
// console.log(date_list);

var date = '20170315';
// var datetodate =Date.parse(date);
// var datetodate = datetodate.toString("YYYY-MM-DD")
// console.log(datetodate);
var datenew = moment(date,'YYYYMMDD').format('YYYY-MM-DD')
console.log(datenew);
//
// var path = process.cwd();
// var config = require(path+'/reply/config/config.js');
// var start_date = config.start_date;
// console.log(config.heyhey);
// console.log(start_date.substring(start_date.length-2,start_date.length));
//
// console.log(start_date.substring(0,4));
// console.log(start_date.substring(5,7));
// console.log(start_date.substring(8,10));

  // for (k in test_set){
  //   for (i in test_set[k]){
  //     var re = test_set[k][i];
  //     console.log(k);
  //     console.log(re);
  //     console.log(re.re_author);
  //     console.log(re.re_contents);
  //     // [k,i,re.re_author,re.re_contents,re.re_date,re.re_reply,re.reply_likes,re.reply_hates,re.like_score,re.scrap_date]
  //     // });
  //   };
  // }
  //


// var fs = require('fs');
// var mysql = require('mysql');
// var conn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '111111',
//   database : 'reply_meter'
// });
// // conn.connect();
// // //중복제거 함수
// // // var clear_same = function(list, table, callback){
// //   // for(i in list){
// //     var sql_same = 'SELECT id from article WHERE portal_id =?';
// //     conn.query(sql_same, 'd20170307184529277', function(err,result, fields){
// //       console.log(result[0]['id']);
// //     })
// //       // }
// // // }
//
// var k = "d20170312234523353"
// var qweqwe = k.split('');
// console.log(qweqwe[0]);
//
//
// console.log(typeof [] != 'object');
//
var a ={a:1,b:2}
delete a.a
console.log(a);
//
// var a =[1,2,3];

// var k = "2013.2.3 31:42"
// var er = k.substring(0,1)
// k =k.split(" ");
// var er = k[k.length-2].split(".")
// var er =er.join("-")
// console.log(er)


// console.log(a[a.length-2]);
// a.shift();
// console.log(a[0]);
// a.push(2);
// console.log(a);
// var k = {};
// k.append({12:34});
// console.log(k);
// var p = "입력 2017.03.10 13:04";
//
// var rerew = "";
// console.log(typeof rerew != undefined);
// var a = document.querySelectorAll('ul.list_comment li');
// console.log(a.length);
// var count = 0;

//
// var g = [["a","d"],["asd","asd"]]
// console.log(g.length)
// g.shift()
// console.log(g.length)
