module.exports = function(conn){
// var mysql = require('mysql');
// var conn = mysql.createConnection({
  // host     : 'localhost',
  // user     : 'root',
  // password : '111111',
  // database : 'reply_meter'
// });
// conn.connect();

  //mysql 빈 아티클 검색
  var find_null_article = function(startdate, enddate,portal_name,callback){
    var start_date = startdate+" 00:00:00"
    var end_date = enddate+" 23:59:59"
    console.log(start_date)
    console.log(end_date)
    var sql = 'select portal_id FROM article WHERE wr_date >= ? AND wr_date< ? AND contents is NULL AND portal_name = ?';
    var result = [];
    conn.query(sql, [start_date, end_date, portal_name],function(err, results, fields){
      if(err){
        console.log(err);
      }else{
        for (i in results){
          result.push(results[i].portal_id);
          console.log("test")
          console.log(i)
        }
        // setTimeout(function(){callback(result)},3000);
        callback(result)
      }
    });
  };

  return find_null_article;
}
//
//find_null_article 용례
// find_null_article('2017-04-06','2017-04-07','naver',function(data){
  // console.log(data)
// });
