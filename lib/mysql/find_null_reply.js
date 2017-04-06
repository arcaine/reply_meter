module.exports = {
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
  return find_null_reply;
}
