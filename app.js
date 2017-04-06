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

var get_today = function(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = yyyy+'-'+mm+'-'+dd;
  // document.write(today);
  return today
}



//jade 설정
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

//kakao api
app.get('/keyboard', (req, res) => {
  const menu = {
      type: 'buttons',
      buttons: ["메뉴1", "메뉴2", "메뉴3"]
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});

app.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    let massage = {
        "message": {
            "text": '응답 메세지...'
        },
        "keyboard": {
            "type": "buttons",
            "buttons": [
                "메뉴1",
                "메뉴2",
                "메뉴3"
            ]
        }
    };
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(massage));
});

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


app.get('/api/today_article',function(req,res){
  var today = get_today();
  var sql = 'select count(*)from article where wr_date > '+today.toString();
  conn.query(sql,function(err,results,fields){
    console.log(results)
    res.json(results)
  });
})


app.get('/api/today_reply',function(req,res){
  var today = get_today();
  var sql = 'select count(*)from reply where re_date > '+today.toString();
  conn.query(sql,function(err,results,fields){
        console.log(results)
    res.json(results)
  });
})

app.get('*',function(req,res){
  res.sendFile(__dirname +'/public/index.html');
});

app.get('/api/article:id',function(req,res){
  var sql = 'select * from article where portal_id = '+req.params.id;
  conn.query(sql,function(err,results,fields){
    console.log(results);
    res.json(results)
  })
});

app.get('/keyboard', (req, res) => {
  const menu = {
      type: 'buttons',
      buttons: ["메뉴1", "메뉴2", "메뉴3"]
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});



app.listen(3003, function(){
  console.log('Connected, 3003 Port!')
});
