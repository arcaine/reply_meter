module.exports = function(conn){
  //--------------------------------------------여기부터 문제 발생 무한루프
  var db_cont_save = function(data,callback){
    var sql = 'UPDATE article SET title=?,contents=?,author=?,scrap_date=?,original_url=?,likes=? WHERE portal_id = ?';
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
      conn.query(sql,[data_one.title,data_one.contents,data_one.author,data_one.scrap_date,data_one.original_url,data_one.likes,article_one],function(err,results,fields){
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

  return db_cont_save;
  //-------------------------여기위까지
  // db_cont_save 용례
  // var test_set = {'d20170307184529277':{title:'으악',contents:'성공적',author:'민수',wr_date:'2017-03-08',scrap_date:'2017-03-07',original_url:'asd',likes:0},"d20170307184517267":{title:'으악',contents:'성공적',author:'민수',wr_date:'2017-03-08',scrap_date:'2017-03-07',original_url:'asd',likes:0}}
  // db_cont_save(test_set,function(){
  //   console.log('finished')
  // });

};
