var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');

var url = "http://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100"

var requestOptions  = { method: "GET"
                ,uri: url
                ,headers: { "User-Agent": "Mozilla/5.0" }
                ,encoding: null
            };

// request 모듈을 이용하여 html 요청
request(requestOptions, function(error, response, body) {
  // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
  var strContents = new Buffer(body);
  var body = iconv.decode(strContents, 'EUC-KR').toString();
  var $ = cheerio.load(body);
  var postlists = $("div.section_headline.headline_subordi");
  postlists.each(function(){
    var postname = $(this).find("a.compo_linkhead").text();
    var posturl = $(this).find("a.compo_linkhead").attr("href");
    console.log(postname+posturl)
  });
  // console.log(body);
  //일단은 전체 내용은 디코드하기 -> 그다음에 cheerio 처리등을 진행해야 함
  console.log("finished")
});
