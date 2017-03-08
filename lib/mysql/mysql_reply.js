var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'reply_meter'
});
conn.connect();

var db_reply_save = function(data,callback){
  var sql = 'INSERT INTO reply (portal_id,reply_id, re_author, re_contents,re_date, re_reply, reply_likes, reply_hates, like_score, scrap_date) values(?,?,?,?,?,?,?,?,?,?)'
  for (i in data){
    var re = data[i];
    conn.query(sql,[re.portal_id,i,re.re_author,re.re_contents,re.re_date,re.re_reply,re.reply_likes,re.reply_hates,re.like_score,re.scrap_date],function(err,results,fields){
      if(err){
        console.log(err);
      }else{

      }
    });
  }
  callback();
}
//test는 댓글 크롤러 완성후
// db_reply_save();

module.exports.reply_save = db_reply_save;
