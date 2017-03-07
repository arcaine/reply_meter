var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'reply_meter'
});
conn.connect();
// //중복제거 함수
// var clear_same = function(list,callback){
//   for(i in list){
//     console.log(i)
//         conn.query(sql_same, i, function(err, result, fields){
//       console.log("!!!"+result[0]);
//
//     })
//   }
//   callback(list);
// }
//
// var sql_find = function(list,a,sql_same,callback){
//   if(a.length>0){
//     conn.query(sql_same,a[0],function(err,result,fields){
//       if(result.length!=0){
//         console.log("prob"+i);
//         delete list.a[0];
//       }
//       a.shift();
//     });
//     sql_find(list,a,sql_same,i,callback);
//   }else{
//     callback(list);
//   }
// }
//
//
// var clear_same =function(list,callback){
//   var b = []
//   for (i in list){
//     b.push(i);
//   };
//   var sql_same = 'SELECT id from article WHERE portal_id =?';
//   sql_find(list,b,sql_same,function(list){
//     callback(list);
//   });
// };
//
//
// var list = {"1234":{asdad:213},"d20170307184529277":{"portal_id":12},"asldl":{df:34},"d20170307183934045":{"asd":"asd"}}
// clear_same(list,function(list){
//   console.log(list);
// });

//
var list_save = function(data,callback){
  if(typeof data != "object"){
    data = JSON.parse(data);
  }
  //입력함수들
  var sql = 'INSERT INTO article (portal_id, category, portal_url, title, cover, press, wr_date, scrap_date) values(?,?,?,?,?,?,?,?)';
  for (i in data){
    conn.query(sql,[i, data[i].category,data[i].portal_url,data[i].title,data[i].cover,data[i].press,data[i].date,data[i].scrapdate],function(err,result,fields){
      if(err){
        console.log(err);
      }else{
      }
    });
  }
  callback();
};


module.exports = list_save;
