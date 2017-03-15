var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'reply_meter'
});
conn.connect();
//리스트 저장 함수
var list_save = function(data,callback){
  if(typeof data != "object"){
    data = JSON.parse(data);
  }
  //입력함수들
  var sql = 'INSERT INTO article (portal_id, category, portal_url, title, cover, press, wr_date, scrap_date) values(?,?,?,?,?,?,?,?)';
  for (i in data){
    conn.query(sql,[i, data[i].category,data[i].portal_url,data[i].title,data[i].cover,data[i].press,data[i].date,data[i].scrapdate],function(err,result,fields){
      if(err){
      console.log(err)
      }else{
      }
    });
  }
  callback();
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//url 찾아주기 함수
var find_url_loop = function(a,data,sql,result,callback){
  if(a>0){
    conn.query(sql,data[a-1],function(err,results,fields){
      if(err){
      }else{
        result[data[a-1]] = {"portal_url":results[0].portal_url}
        find_url_loop(a-1,data,sql,result,callback)
      }
    });
  }else{
    callback(result)
  };
};

var find_url = function(data, callback){
  if(typeof data != 'object'){
    console.log("no object!")
    return "nope"
  }
  var sql = 'SELECT portal_url from article where portal_id = ?'
  var a = data.length;
  var result = {}
  find_url_loop(a,data,sql,result,function(result){
    callback(result);
  })
};

//find_url 용례
// find_url(["d20170307184529277", "d20170307184405228"],function(data){
//   console.log("dadan")
//   console.log(data)
// });


//mysql 빈 아티클 검색
var find_null_article = function(startdate, enddate,callback){
  var sql = 'select portal_id FROM article WHERE wr_date >= ? AND wr_date< ? AND contents is NULL';
  var result = [];
  conn.query(sql, [startdate, enddate],function(err, results, fields){
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

//find_null_article 용례
find_null_article('2017-03-02','2017-03-08',function(data){
  console.log(data)
});

var db_cont_save = function(data,callback){
  var sql = 'UPDATE article SET title=?,contents=?,author=?,wr_date=?,scrap_date=?,original_url=?,likes=? WHERE portal_id = ?';
  var id_list =[];
  for(i in data){
    id_list.push(i);
  };
  db_cont_save_loop(id_list,sql,data,function(){
    callback();
  });
};

var db_cont_save_loop = function(id_list,sql,data,callback){
  if(id_list.length>0){
    var article_one = id_list[0];
    var data_one = data[article_one];
    conn.query(sql,[data_one.title,data_one.contents,data_one.author,data_one.wr_date,data_one.scrap_date,data_one.original_url,data_one.likes,article_one],function(err,results,fields){
      if(err){
        console.log(err)
      }else{
        id_list.shift();
        db_cont_save_loop(id_list,sql,data,callback);
      }
    });
  }else{
    callback();
  };
};

// db_cont_save 용례
// var test_set = {'d20170307184529277':{title:'으악',contents:'성공적',author:'민수',wr_date:'2017-03-08',scrap_date:'2017-03-07',original_url:'asd',likes:0},"d20170307184517267":{title:'으악',contents:'성공적',author:'민수',wr_date:'2017-03-08',scrap_date:'2017-03-07',original_url:'asd',likes:0}}
// db_cont_save(test_set,function(){
//   console.log('finished')
// });


var find_null_reply = function(startdate, enddate,callback){
  var sql = 'select portal_id FROM article WHERE wr_date >= ? AND wr_date< ? AND num_reply is NULL';
  var result = [];
  conn.query(sql, [startdate, enddate],function(err, results, fields){
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


var test_set ={
  "d20170315185802194": {
    "portal_url": "http://v.media.daum.net/v/20170315185802194"
  },
  "d20170315185902209": {
    "portal_url": "http://v.media.daum.net/v/20170315185902209"
  },
  "d20170315185904211": {
    "portal_url": "http://v.media.daum.net/v/20170315185904211"
  },
  "d20170315185921215": {
    "portal_url": "http://v.media.daum.net/v/20170315185921215"
  },
  "d20170315185929223": {
    "portal_url": "http://v.media.daum.net/v/20170315185929223"
  },
  "d20170315185933225": {
    "portal_url": "http://v.media.daum.net/v/20170315185933225"
  },
  "d20170315185941231": {
    "portal_url": "http://v.media.daum.net/v/20170315185941231"
  },
  "d20170315185947233": {
    "portal_url": "http://v.media.daum.net/v/20170315185947233"
  },
  "d20170315185956236": {
    "portal_url": "http://v.media.daum.net/v/20170315185956236"
  },
  "d20170315185956237": {
    "portal_url": "http://v.media.daum.net/v/20170315185956237"
  },
  "d20170315190001240": {
    "portal_url": "http://v.media.daum.net/v/20170315190001240"
  },
  "d20170315190017249": {
    "portal_url": "http://v.media.daum.net/v/20170315190017249"
  },
  "d20170315190022254": {
    "portal_url": "http://v.media.daum.net/v/20170315190022254"
  },
  "d20170315190024255": {
    "portal_url": "http://v.media.daum.net/v/20170315190024255"
  },
  "d20170315190102265": {
    "portal_url": "http://v.media.daum.net/v/20170315190102265"
  },
  "d20170315190126274": {
    "portal_url": "http://v.media.daum.net/v/20170315190126274"
  },
  "d20170315190127275": {
    "portal_url": "http://v.media.daum.net/v/20170315190127275"
  },
  "d20170315190215290": {
    "portal_url": "http://v.media.daum.net/v/20170315190215290"
  },
  "d20170315190226292": {
    "portal_url": "http://v.media.daum.net/v/20170315190226292"
  },
  "d20170315190249301": {
    "portal_url": "http://v.media.daum.net/v/20170315190249301"
  },
  "d20170315190320310": {
    "portal_url": "http://v.media.daum.net/v/20170315190320310"
  },
  "d20170315190328312": {
    "portal_url": "http://v.media.daum.net/v/20170315190328312"
  },
  "d20170315190504348": {
    "portal_url": "http://v.media.daum.net/v/20170315190504348"
  },
  "d20170315190507357": {
    "portal_url": "http://v.media.daum.net/v/20170315190507357"
  },
  "d20170315190513360": {
    "portal_url": "http://v.media.daum.net/v/20170315190513360"
  },
  "d20170315190603370": {
    "portal_url": "http://v.media.daum.net/v/20170315190603370"
  },
  "d20170315190605373": {
    "portal_url": "http://v.media.daum.net/v/20170315190605373"
  },
  "d20170315190606374": {
    "portal_url": "http://v.media.daum.net/v/20170315190606374"
  },
  "d20170315190622379": {
    "portal_url": "http://v.media.daum.net/v/20170315190622379"
  },
  "d20170315190904440": {
    "portal_url": "http://v.media.daum.net/v/20170315190904440"
  },
  "n0000512387": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=055&aid=0000512387"
  },
  "n0002940707": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=079&aid=0002940707"
  },
  "n0000512388": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=055&aid=0000512388"
  },
  "n0000125728": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=449&aid=0000125728"
  },
  "n0000512389": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=055&aid=0000512389"
  },
  "n0000125729": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=449&aid=0000125729"
  },
  "n0000125730": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=449&aid=0000125730"
  },
  "n0000125731": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=449&aid=0000125731"
  },
  "n0000125732": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=449&aid=0000125732"
  },
  "n0002356693": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=028&aid=0002356693"
  },
  "n0002356694": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=028&aid=0002356694"
  },
  "n0009102001": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=001&aid=0009102001"
  },
  "n0003837099": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=008&aid=0003837099"
  },
  "n0002771718": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=032&aid=0002771718"
  },
  "n0003262092": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=023&aid=0003262092"
  },
  "n0000686413": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686413"
  },
  "n0000686414": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686414"
  },
  "n0000686417": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686417"
  },
  "n0000686418": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686418"
  },
  "n0000686420": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686420"
  },
  "n0000686421": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686421"
  },
  "n0000686422": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686422"
  },
  "n0000686423": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686423"
  },
  "n0000686428": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686428"
  },
  "n0000686429": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686429"
  },
  "n0000686430": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686430"
  },
  "n0000686431": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686431"
  },
  "n0000686432": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686432"
  },
  "n0000686433": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686433"
  },
  "n0000686434": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686434"
  },
  "n0000686435": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686435"
  },
  "n0000686436": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=082&aid=0000686436"
  },
  "n0000125733": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=449&aid=0000125733"
  },
  "n0000985705": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985705"
  },
  "n0010429764": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=056&aid=0010429764"
  },
  "n0000985712": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985712"
  },
  "n0000125737": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=449&aid=0000125737"
  },
  "n0000985713": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985713"
  },
  "n0000985714": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985714"
  },
  "n0003770676": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=018&aid=0003770676"
  },
  "n0009102002": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=001&aid=0009102002"
  },
  "n0002356695": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=028&aid=0002356695"
  },
  "n0002356696": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=028&aid=0002356696"
  },
  "n0002356697": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=028&aid=0002356697"
  },
  "n0000985710": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985710"
  },
  "n0002606614": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=421&aid=0002606614"
  },
  "n0000985709": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985709"
  },
  "n0000985939": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985939"
  },
  "n0000985707": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985707"
  },
  "n0002771719": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=032&aid=0002771719"
  },
  "n0003951283": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=277&aid=0003951283"
  },
  "n0002771720": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=032&aid=0002771720"
  },
  "n0002940710": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=079&aid=0002940710"
  },
  "n0009102004": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=001&aid=0009102004"
  },
  "n0002940711": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=079&aid=0002940711"
  },
  "n0002991158": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=011&aid=0002991158"
  },
  "n0002940712": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=079&aid=0002940712"
  },
  "n0002940713": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=079&aid=0002940713"
  },
  "n0002940714": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=079&aid=0002940714"
  },
  "n0002940715": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=079&aid=0002940715"
  },
  "n0002771723": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=032&aid=0002771723"
  },
  "n0010429766": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=056&aid=0010429766"
  },
  "n0002606620": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=421&aid=0002606620"
  },
  "n0003951284": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=277&aid=0003951284"
  },
  "n0002804979": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=081&aid=0002804979"
  },
  "n0010429767": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=056&aid=0010429767"
  },
  "n0010429768": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=056&aid=0010429768"
  },
  "n0003837100": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=008&aid=0003837100"
  },
  "n0002771724": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=032&aid=0002771724"
  },
  "n0000977069": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=005&aid=0000977069"
  },
  "n0000985717": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=052&aid=0000985717"
  },
  "n0007823779": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=003&aid=0007823779"
  },
  "n0002804980": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=081&aid=0002804980"
  },
  "n0007823780": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=003&aid=0007823780"
  },
  "n0002693586": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693586"
  },
  "n0002693591": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693591"
  },
  "n0002693593": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693593"
  },
  "n0002693594": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693594"
  },
  "n0002693595": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693595"
  },
  "n0002693598": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693598"
  },
  "n0002693599": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693599"
  },
  "n0002693600": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693600"
  },
  "n0002693601": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693601"
  },
  "n0002693602": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693602"
  },
  "n0003837101": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=008&aid=0003837101"
  },
  "n0002693604": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693604"
  },
  "n0002693607": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693607"
  },
  "n0002693609": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693609"
  },
  "n0002693611": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693611"
  },
  "n0002693612": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693612"
  },
  "n0002693613": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=025&aid=0002693613"
  },
  "n0002606625": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=421&aid=0002606625"
  },
  "n0002356698": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=028&aid=0002356698"
  },
  "n0002356699": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=028&aid=0002356699"
  },
  "n0002606626": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=421&aid=0002606626"
  },
  "n0002606627": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=421&aid=0002606627"
  },
  "n0002991160": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=011&aid=0002991160"
  },
  "n0002606628": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=421&aid=0002606628"
  },
  "n0003903351": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=009&aid=0003903351"
  },
  "n0002591490": {
    "portal_url": "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=030&aid=0002591490"
  }
};


var daum_or_naver_loop = function(daum,naver,data,callback){
  var a = Object.keys(data)[0]
  // console.log(a)
  // console.log(a)
  // console.log(a)
  var ab = a.substring(0,1)
  var a = Object.keys(data)[0]
  if(ab==='d'){
    daum[a] = data[a]
  }else if(ab==='n'){
    naver[a] = data[a]
  }
  delete data[a];
  if(Object.size(data)>0){
    daum_or_naver_loop(daum,naver,data,callback)
  }else{
    callback(daum,naver)
  }
}

var daum_or_naver = function(data,callback){
  var daum ={};
  var naver = {};
  console.log(Object.keys(data));
  daum_or_naver_loop(daum,naver,data,function(daum,naver){
    callback(daum,naver)
  });
}
//
// daum_or_naver(test_set,function(daum,naver){
//   console.log(daum)
//   console.log('_________________')
//   console.log(naver)
//   console.log('a?')
// });

//find_null_reply 용례
// find_null_reply('2017-03-01','2017-03-09',function(data){
//   console.log(data)
// });

// var count_replys = function(startdate,enddate,callback){
//   var sql_1 = 'select portal_id from article WHERE wr_date >= ? AND wr_date< ?'
//   var sql_2 = 'select count(*) from reply WHERE portal_id = ?'
//   var sql_3 = 'update article SET num_reply = ? WHERE portal_id=?'
//   conn.query(sql_1,[startdate,enddate],function(err,results,fields){
//     if(err){
//       console.log(err)
//     }else{
//       for(i in results){
//         var portal_id_ = results[i].portal_id;
//         conn.query(sql_2,[portal_id_],function(err,results,fields){
//           if(err){
//             console.log(err)
//           }else{
//             conn.query(sql_3,[results[0]['count(*)'],portal_id_],function(err,results,fields){
//               if(err){
//                 console.log(err)
//               }else{
//               }
//             });
//           };
//         });
//       }
//     }
//   });
//   callback();
// }
//
// count_replys('2017-03-01','2017-03-09',function(){
//   console.log('done')
// });
//

//module.exports 뒤에 프로퍼티로 달아서 옮길수있는모양이다!
module.exports.list_save = list_save;
module.exports.find_url = find_url;
module.exports.find_null_article = find_null_article;
module.exports.db_cont_save = db_cont_save;
module.exports.find_null_reply = find_null_reply;
module.exports.daum_or_naver = daum_or_naver;
