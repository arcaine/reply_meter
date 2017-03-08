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
      //  throw(err);
      }else{
      }
    });
  }
  callback();
};


//url 찾아주기 함수
var find_url_loop = function(a,data,sql,result,callback){
  if(a>0){
    conn.query(sql,data[a-1],function(err,results,fields){
      if(err){
      }else{
        result[data[a-1]] = {"portal_url":results[0].portal_url}
        find_url_loop(a-1,data,sql,result,callback)
      }
    });
  }else{
    callback(result)
  };
};

var find_url = function(data, callback){
  if(typeof data != 'object'){
    console.log("no object!")
    return "nope"
  }
  var sql = 'SELECT portal_url from article where portal_id = ?'
  var a = data.length;
  var result = {}
  find_url_loop(a,data,sql,result,function(result){
    callback(result);
  })
};

find_url(["d20170307184529277", "d20170307184405228"],function(data){
  console.log("dadan")
  console.log(data)
});

//module.exports 뒤에 프로퍼티로 달아서 옮길수있는모양이다!
module.exports.list_save = list_save;
module.exports.find_url = find_url;
