var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');

var requestOptions  = { method: "GET"
                ,uri: "http://news.naver.com/main/read.nhn?mode=LS2D&mid=shm&sid1=105&sid2=731&oid=092&aid=0002111487"
                ,headers: { "User-Agent": "Mozilla/5.0" }
                ,encoding: null
            };

// request 모듈을 이용하여 html 요청
request(requestOptions, function(error, response, body) {
  // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
  var strContents = new Buffer(body);
  var body = iconv.decode(strContents, 'EUC-KR').toString();
  var $ = cheerio.load(body);
  var body = $("div.article_header div.article_info h3").text().toString();
  console.log(body);
  //일단은 전체 내용은 디코드하기 -> 그다음에 cheerio 처리등을 진행해야 함
});
