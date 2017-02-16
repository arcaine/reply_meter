var request = require('request');
var cheerio = require('cheerio');

for (i =1 ; i<30 ; i ++ ){
  var url = "http://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100#&date=2017-02-15%2000:00:00&page=1"
  request(url,function(i){
    return function(err,resp,body){
      console.log(err)
      console.log(1)
      console.log(i)
    }
    console.log(2)

});
}
  console.log(3)

console.log(4)
