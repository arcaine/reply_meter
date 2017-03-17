module.exports = function(conn){
  // var fs = require('fs');
  var fs = require('fs');
  var mysql = require('mysql');

  // var path = process.cwd();
  // var config = require('./config/config.js');

  // var conn = mysql.createConnection({
  //   host     : 'localhost',
  //   user     : 'root',
  //   password : '111111',
  //   database : 'reply_meter'
  // });
  // conn.connect();

  Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
  };

  //리스트 저장 함수
  var list_save = function(data,callback){
    var data_list = Object.keys(data);
    var i = data_list[0];
    console.log('progress1')
    console.log(i)
    var sql = 'INSERT INTO article (portal_id, category, portal_url, title, cover, press, wr_date, scrap_date,portal_name) values(?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE wr_date =?';
    conn.query(sql,[i, data[i].category,data[i].portal_url,data[i].title,data[i].cover,data[i].press,data[i].date,data[i].scrapdate,data[i].portal_name,data[i].date],function(err,result,fields){
      if(err){
        // if(err.code === 'ER_DUP_ENTRY'){
        //   throw err
        // }else{
          console.log(err);
      }else{
        console.log('progress done_2');
        console.log("savedone");
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(i);
        delete data[i];
        console.log(Object.size(data));
        console.log('데이터길이!');
        if(Object.size(data)>0){
          list_save(data,callback);
        }else{
          callback();
        };
      };
    });
  };



  console.log('ha?')
  return list_save;
};
