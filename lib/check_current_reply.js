var moment = require('moment');

var fs = require('fs');
var mysql = require('mysql');

// var path = process.cwd();
// var config = require('./config/config.js');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
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
var path = process.cwd();


var current_reply = require(path+'/reply/lib/reply/curent_reply.js')(conn,objsize);
var daum_check_reply = require(path+'/reply/lib/reply/daum_check_reply.js')();
var find_list = require(path+'/reply/lib/mysql/find_list.js')(conn);
var find_url = require(path+'/reply/lib/mysql/find_url.js')(conn);
find_list('2017-03-15','2017-03-17','daum',function(data){
  console.log(data);
  find_url(data,function(result){
    console.log(result);
    daum_check_reply(result,function(final_result){
      console.log(final_result);
    })
  });
});
