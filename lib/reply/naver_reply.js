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

var getreply_basic =function(){
  var url = "http://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100#&date=2017-02-15%2000:00:00&page="+page
  var requestOptions  = { method: "GET"
                  ,uri: url
                  ,headers: { "User-Agent": "Mozilla/5.0" }
                  ,encoding: null
              };
  var result = {}
  request(requestOptions, function(error,response, body){
    if(error) throw error;
    var strContents
    var strContents = new Buffer(body);
    var body = iconv.decode(strContents, 'EUC-KR').toString();
    var $ = cheerio.load(body);
    var article_info = $("div.article_info");
    var articletitle = article_info.find("h3#articleTitle").text().trim();
    var article_wr_time = article_info.find("div.sponsor span.t11").text();
    var article_original = article_info.find("div.article_btns a.pi_btn").attr("href");
    if($)
    var $("span.end_photo_org")
  });

};
