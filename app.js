//server입니다
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));

//jade 설정
app.set('views', './views');
app.set('view engine', 'jade');

var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'reply_meter'
});
conn.connect();

//jade 설정
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/api/articles',function(req,res){
  sql = 'select * from article order by wr_date desc limit 10'
  conn.query(sql, function(err,results, fields){
    res.json(results)
  })
})

app.get('/api/replys',function(req,res){
  sql = 'select * from reply order by re_date desc limit 10'
  conn.query(sql, function(err,results, fields){
    res.json(results)
  })
})



app.get('*',function(req,res){
  res.sendFile('d:/dev/reply/public/index.html');
});




app.listen(3003, function(){
  console.log('Connected, 3003 Port!')
});
