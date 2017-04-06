// var sql = "select count(*) from reply where portal_id = ?"
//
// var test_set = [['n0010131814',{"portal_url":"1233213"}],['n0010431299',{"portal_url":"1233213"}]]
//
// var mysql = require('mysql');
//
// // var path = process.cwd();
// // var config = require('./config/config.js');
//
// var conn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '111111',
//   database : 'reply_meter'
// });
// conn.connect();


// objsize = function(obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };

module.exports = function(conn,objsize){
  var current_reply_loop = function(result,data,callback){
    var sql = 'select count(*) from reply where portal_id = ?'
    // console.log(data)
    var portal_id = data[0][0];
    console.log(portal_id)

    conn.query(sql,[portal_id],function(err,results,fields){
        result[portal_id] = results[0]['count(*)'];
        // console.log(result);
        data.shift();
        // console.log(data)
        if(objsize(data)>0){
          current_reply_loop(result,data,callback)
        }else{
          callback(result);
        }
    });
  };

  var current_reply = function(data,callback){
    var result = {};
    current_reply_loop(result,data,function(data){
      callback(data);
    })
  };
  return current_reply;
}
