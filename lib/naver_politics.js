var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');


var merge = function(a,b){
  var resultObj = {}
  for (var i in b){
    a[i] = b[i]
  }
  resultObj = a
  return resultObj
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var getid = function(a){
 var b = a.toString()
 var c = b.substring(b.length,b.length-10)
 return c
}

function getdata(page, callback){
  var url = "http://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100#&date=2017-02-15%2000:00:00&page="+page
  var requestOptions  = { method: "GET"
                  ,uri: url
                  ,headers: { "User-Agent": "Mozilla/5.0" }
                  ,encoding: null
              };


  // request 모듈을 이용하여 html 요청
  var result = {}
  request(requestOptions, function(error, response, body) {
    // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
    if(error)throw error;
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
          // wr_time:article_wr_time
        }
        result["n"+article_id] = a
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


var getalldata =function(page,pagelimit,callback){
    getdata(page,function(data){
      // var temp_var ={page: page+"__________________________"}
      big = merge(big,data)
      // big = merge(big,temp_var)
      if (page >=pagelimit){
        callback(big)
      }else{
        getalldata(page+1,pagelimit,callback);
      }
    })
}

var naver_politics = function(pagelimit,callback){
  big = {}
  var page =1
  getalldata(1,pagelimit,function(data){
    callback(data)
  })
}

naver_politics(5,function(data){
  console.log(data)
})

// module.exports = naver_politics
