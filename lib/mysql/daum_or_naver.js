module.exports  = function(conn, objsize){
  var daum_or_naver_loop = function(daum,naver,data,callback){
    var a = Object.keys(data)[0]
    // console.log(a)
    // console.log(a)
    // console.log(a)
    var ab = a.substring(0,1)
    var a = Object.keys(data)[0]
    if(ab==='d'){
      daum[a] = data[a].portal_url
    }else if(ab==='n'){
      naver[a] = data[a].portal_url
    }
    console.log('하나분류 완료')
    delete data[a];
    if(objsize(data)>0){
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
  return daum_or_naver;
}
