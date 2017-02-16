var async = require('async');

var merge = function(a,b){
  var resultObj = {}
  for (var i in b){
    a[i] = b[i]
  }
  resultObj = a
  return resultObj
}
var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');

// for (var page =1 ; page <30 ; page++){
function getdata(page, callback){
  var url = "http://media.daum.net/breakingnews/politics?page="+page

  var requestOptions  = { method: "GET"
                  ,uri: url
                  ,headers: { "User-Agent": "Mozilla/5.0" }
                  ,encoding: null
              };

  var getid = function(a){
   var b = a.toString()
   var c = b.substring(b.length,b.length-17)
   return c
  }

  // request 모듈을 이용하여 html 요청
  var result = {}
  request(requestOptions, function(error, response, body) {
    // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
    var strContents = new Buffer(body);
    // var body = iconv.decode(strContents, 'EUC-KR').toString();
    var $ = cheerio.load(body);
    var postlists = $("ul.list_news2");
    postlists.each(function(){
      var article_lists = $(this).find("li")
      article_lists.each(function(){
        var article_name = $(this).find("div.cont_thumb a").text().trim();
        var article_company = $(this).find("div.cont_thumb span.info_news").text().trim();
        var article_url = $(this).find("div.cont_thumb a").attr("href");
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
        result["d"+article_id] = a
      });
    });
    // console.log(body);
    //일단은 전체 내용은 디코드하기 -> 그다음에 cheerio 처리등을 진행해야 함
    // console.log(result)
    // console.log(page)
    // console.log("________________________________")
    callback(result)
  });
}

function getalldata(pagelimit, callback){
  var list = []
  for(i = 0; i<pagelimit+1; i++){
    list[i] = i
  }

  var big = {}
  list.each(
    getdata(page,function(result){
      for (var item in result){
        for(var one in big){
          if(one === item){
            delete result[item]
          }
        }
      }
      big = merge(big,result)
    })
  )
  callback(big)
}

getalldata(3, function(big){
  console.log(big)
})
