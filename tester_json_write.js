var daum_list = require("./lib/daum_list.js");
var fs = require('fs');
daum_list(1,"politics",function(data){
  var stringJson = JSON.stringify(data);
  fs.writeFile('result.json',stringJson,'utf8',function(err){
    console.log('done!');
  })
});
