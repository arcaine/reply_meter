var moment = require('moment');

var fs = require('fs');
var mysql = require('mysql');

// var path = process.cwd();
var config = require('./config/config.js');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : config.password,
  database : 'reply_meter'
});
conn.connect();


objsize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};



//config 가져오기
var start_date = config.start_date;
var end_date = config.end_date;
var page_limit = config.page_limit;
var category = config.category;
//mysql 저장 함수
var list_save = require('./lib/mysql/list_save')(conn);
// console.log(list_save)
// var list_save = mysql_article.list_save;
var find_url = require('./lib/mysql/find_url')(conn,objsize);
var daum_or_naver = require('./lib/mysql/daum_or_naver')(conn,objsize);
var find_list =require('./lib/mysql/find_list')(conn);
var daum_reply =require('./lib/reply/daum_reply');

//mysql reply 함수
var mysql_reply = require('./lib/mysql/mysql_reply.js');
var reply_save = mysql_reply.reply_save;
var reply_update = mysql_reply.db_reply_update;





console.log('뭐라도 찍혀야 생색이 나지')


//댓글 크롤링
// var daum_reply = require('./lib/reply/daum_reply.js');
var naver_reply = require('./lib/reply/naver_reply.js');


//mysql reply 함수
// var mysql_reply = require('./lib/mysql/mysql_reply.js');
// var reply_save = mysql_reply.reply_save;
// var reply_update = mysql_reply.db_reply_update;



var async = require('async');

var tasks = [
//   function(callback){
//     find_list(start_date,end_date,'daum',function(data){
//       console.log(data)
//
//       find_url(data,function(data_list){
//         console.log("url_done")
//         daum_reply(data_list,function(daum_result){
//           reply_save(daum_result,function(){
//             console.log("good saved!")
//             callback(null,"daum done")
//           })
//         });
//       });
//     });
//   },
  function(callback){
    find_list(start_date,end_date,'naver',function(data){
      find_url(data,function(data_list){
        console.log(data_list)
        naver_reply(data_list,function(naver_result){
          reply_save(naver_result,function(){
            console.log("good saved!")
            callback(null,"naver done")
          })
        });
      });
    });
  },

  function(callback){
    conn.end();
    callback(null, 'ended!')
  }
];

async.series(tasks,function(err,results){
  console.log(results);
})
