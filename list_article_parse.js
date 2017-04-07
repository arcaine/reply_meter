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
var find_null_article = require('./lib/mysql/find_null_article')(conn);
var daum_or_naver = require('./lib/mysql/daum_or_naver')(conn,objsize);
// var find_null_article = mysql_article.find_null_article;
// var cont_save = mysql_article.db_cont_save;
// var find_null_reply = mysql_article.find_null_reply;
// var daum_or_naver = mysql_article.daum_or_naver;



//크롤링
var daum_list = require('./lib/daum_list.js');
var naver_list = require('./lib/naver_list')();


console.log('뭐라도 찍혀야 생색이 나지')


//크롤링
var daum_article = require('./lib/daum_article.js');
var naver_article = require('./lib/naver_article.js');
//댓글 크롤링
// var daum_reply = require('./lib/reply/daum_reply.js');
// var naver_reply = require('./lib/reply/naver_reply.js');

var db_cont_save = require('./lib/mysql/db_cont_save')(conn);

//mysql reply 함수
// var mysql_reply = require('./lib/mysql/mysql_reply.js');
// var reply_save = mysql_reply.reply_save;
// var reply_update = mysql_reply.db_reply_update;



var async = require('async');

var tasks = [
  function(callback){
    naver_list(start_date,end_date,1,category,function(data){
      console.log(data);
      list_save(data,function(){
        console.log("naver_list_done")
        callback(null, 'naver_done')
      });
    });
  },
  function(callback){
    daum_list(start_date,end_date,1,category,function(data){
      // console.log('parse finished')
      // console.log(Object.size(data))
      list_save(data,function(){
        console.log("daum_list_done")
        callback(null, "daum_done")
      });
    });
  },
  function(callback){
    find_null_article(start_date,end_date,'daum',function(data){
      if(data.length===0){
        callback(null,"find_Daum")
      }else{
        // console.log(data)
        find_url(data,function(result){
          daum_article(result,function(article_result){
            console.log("++++++++++++++++++++++++++++++++++++++++++")
            console.log(objsize(article_result))
            db_cont_save(article_result,function(){
              console.log("Yeah!")
              callback(null,"find_daum")
            });
          });
        });

      }
    });
  },
  function(callback){
    find_null_article(start_date,end_date,'naver',function(data){
      console.log(data)
      if(data.length===0){
        console.log("NOPE")
        callback(null,"find_naver")
      }else{
        find_url(data,function(result){
          naver_article(result,function(article_result){
            db_cont_save(article_result,function(){
              console.log("YEah!")
              callback(null,"find_naver")
            })
          });
        });
      }
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
