//server입니다
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var daum_politics =  require("./lib/daum_politics.js")


//jade 설정
app.set('views', './views');
app.set('view engine', 'jade');

// var mysql = require('mysql');
// var conn = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '111111',
//   database : 'o2'
// });
// conn.connect();

//jade 설정
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/',function(req,res){
  daum_politics(1, function(data){
    res.render("index", {articles:data})
  })
});
app.listen(3003, function(){
  console.log('Connected, 3003 Port!')
});
