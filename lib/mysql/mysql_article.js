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
      //  throw(err);
      }else{
      }
    });
  }
  callback();
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

//module.exports 뒤에 프로퍼티로 달아서 옮길수있는모양이다!
module.exports.list_save = list_save;
module.exports.find_url = find_url;
module.exports.find_null_article = find_null_article;
module.exports.db_cont_save = db_cont_save;
