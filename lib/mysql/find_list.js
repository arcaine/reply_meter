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
  var find_list = function(startdate, enddate,portal_name,callback){
    var start_date = startdate+" 00:00:00"
    var end_date = enddate+" 00:00:00"

    var sql = 'select portal_id FROM article WHERE wr_date >= ? AND wr_date< ? AND portal_name = ?';
    var result = [];
    conn.query(sql, [startdate, enddate, portal_name],function(err, results, fields){
      if(err){
        console.log(err);
      }else{
        for (i in results){
          result.push(results[i].portal_id);
        }
        callback(result);
      }
    });
  };

  return find_list;
}

// find_list('2015-03-15','')
//
// //find_null_article 용례
// find_null_article('2017-03-15','2017-03-16','daum',function(data){
//   console.log(data)
// });
