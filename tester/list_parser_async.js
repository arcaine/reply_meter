var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');
var url = "http://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100#&date=2017-02-13 00:00:00&page=1"

var requestOptions  = { method: "GET"
                ,uri: url
                ,headers: { "User-Agent": "Mozilla/5.0" }
                ,encoding: null
            };

var getid = function(a){
 var b = a.toString()
 var c = b.substring(b.length,b.length-10)
 return c
}

// request 모듈을 이용하여 html 요청
var result = {}

var q = async.queue(function(task,done){
  request(url, funcion(err, res ,body){
    request(requestOptions, function(error, response, body) {
      // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
      var strContents = new Buffer(body);
      var body = iconv.decode(strContents, 'EUC-KR').toString();
      var $ = cheerio.load(body);
      var postlists = $("div.section_body ul");
      postlists.each(function(){
        var article_lists = $(this).find("li")
        article_lists.each(function(){
          var article_name = $(this).find("a").text().trim();
          var article_company = $(this).find("span.writing").text().trim();
          var article_url = $(this).find("a").attr("href");
          var article_id = getid(article_url)
          // console.log(article_id)
          // console.log("title: "+article_name)
          // console.log("company: "+article_company)
          // console.log("url: "+article_url)
          var a = {
            title:article_name,
            company:article_company,
            url:article_url
          }
          result["n"+article_id] = a
        });
      });
      // console.log(body);
      //일단은 전체 내용은 디코드하기 -> 그다음에 cheerio 처리등을 진행해야 함
      console.log("finished")
      console.log(result)
    });
  })
})



async.series([
    function(callback) {
        // do some stuff ...
        callback(null, 'one');
    },
    function(callback) {
        // do some more stuff ...
        callback(null, 'two');
    }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
});

async.series({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
});
