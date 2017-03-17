var fs = require('fs');
var mysql = require('mysql');

var path = process.cwd();
var config = require(path+'/reply/config/config.js');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : config.password,
  database : 'reply_meter'
});
conn.connect();

//config 가져오기
var start_date = config.start_date;
var end_date = config.end_date;


//mysql 저장 함수
var mysql_article = require('./lib/mysql/mysql_article.js');
var list_save = mysql_article.list_save;
var find_url = mysql_article.find_url;
var find_null_article = mysql_article.find_null_article;
var cont_save = mysql_article.db_cont_save;
var find_null_reply = mysql_article.find_null_reply;
var daum_or_naver = mysql_article.daum_or_naver;

//크롤링
var daum_article = require('./lib/daum_article.js');
var naver_article = require('./lib/naver_article.js');
//댓글 크롤링
var daum_reply = require('./lib/reply/daum_reply.js');
var naver_reply = require('./lib/reply/naver_reply.js');



//mysql reply 함수
var mysql_reply = require('./lib/mysql/mysql_reply.js');
var reply_save = mysql_reply.reply_save;
var reply_update = mysql_reply.db_reply_update;






// fs.readFile('result_naver.json','utf8',function(err,data){
//   list_save(data,function(){
//     console.log("done!")
//   })
// });
// fs.readFile('result_daum.json','utf8',function(err,data){
//   list_save(data,function(){
//     console.log("done!")
//   })
// })
// find_null_article('2017-03-02','2017-03-16',function(data){
//   console.log(data);
//   find_url(data,function(result){
//     // var stringJson = JSON.stringify(result);
//     fs.writeFile('./null_article.json',JSON.stringify(result),'utf8',function(err){
//       console.log(err);
//       console.log('done!');
//     })
//   });
// });
//
// fs.readFile('./null_article.json','utf8',function(err,data){
//   console.log(err);
//   // console.log(typeof data);
//   var data = JSON.parse(data);
//   // console.log(data);
//   daum_or_naver(data,function(daum,naver){
//     daum_article(daum,function(data){
//           // var stringJson = JSON.stringify(result);
//       fs.writeFile('./daum_article.json',JSON.stringify(data),'utf8',function(err){
//         console.log(err);
//         console.log('daum done!');
//       });
//     });
//     naver_article(naver,function(data){
//           // var stringJson = JSON.stringify(result);
//       fs.writeFile('./naver_article.json',JSON.stringify(data),'utf8',function(err){
//         console.log(err);
//         console.log('naver done!');
//       });
//     });
//   })
// });

// fs.readFile('./daum_article.json','utf8',function(err,data){
//   var data = JSON.parse(data);
//   cont_save(data,function(data){
//     console.log('done! maybe..')
//   });
// });
// fs.readFile('./naver_article.json','utf8',function(err,data){
//   var data = JSON.parse(data);
//   cont_save(data,function(data){
//     console.log('done! maybe..')
//   });
// });


// find_null_reply('2017-03-01','2017-03-16',function(data){
//   find_url(data,function(result){
//     daum_or_naver(result,function(daum,naver){
//       // console.log(naver);
//       naver_reply(naver,function(result){
//         fs.writeFile('./naver_re.json',JSON.stringify(result),'utf8',function(err){
//                 console.log(err);
//                 console.log('naver done!');
//         });
//       });
//     });
//   });
// });


fs.readFile('./daum_re.json','utf8',function(err,data){
  console.log(err);
  console.log(typeof data)
  var data = JSON.parse(data)
  // var data_1 = {};
  for (i in data){
    var data_1 = {};
    data_1[i] = data[i];
    console.log(data_1);
    reply_save(data_1,function(){
      console.log('done!')
    })
  }
});
