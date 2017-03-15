var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'reply_meter'
});
conn.connect();
fs.readFile('result.json','utf8',function(err,data){
  var sql = 'INSERT INTO article (portal_id, category, portal_url, title, cover, press, wr_date, scrap_date) VALUES(?,?,?,?,?,?,?,?)';
  data = JSON.parse(data);
  for (i in data){
    conn.query(sql,[i, data[i].category,data[i].portal_url,data[i].title,data[i].cover,data[i].press,data[i].date,data[i].scrapdate],function(err,result,fields){
      if(err){
        console.log(err);
      }else{

      }
    });
// /      console.log(data[i]);
      // console.log(i);
  }
  // var a = data;
  console.log("done!");
});
// console.log(a);
