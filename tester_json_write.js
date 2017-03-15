var daum_list = require("./lib/daum_list.js");
var naver_list = require("./lib/naver_list.js");

var fs = require('fs');
daum_list(2,"politics",function(data){
  var stringJson = JSON.stringify(data);
  fs.writeFile('./result_daum.json',stringJson,'utf8',function(err){
    console.log(err);
    console.log('done!');
  })
});

naver_list(2,"politics",20170312,function(data){
  var stringJson = JSON.stringify(data);
  fs.writeFile('./result_naver.json',stringJson,'utf8',function(err){
    console.log(err)
    console.log('done!');
  });
});
