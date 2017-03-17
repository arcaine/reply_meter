module.exports = function(conn, objsize){

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
  return find_url;
}




//find_url 용례
// find_url(["d20170307184529277", "d20170307184405228"],function(data){
//   console.log("dadan")
//   console.log(data)
// });
