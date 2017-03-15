var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');





var url = "http://news.naver.com/main/hotissue/read.nhn?mid=hot&sid1=100&cid=1059834&iid=49346860&oid=421&aid=0002606238&ptype=052&m_view=1";
var requestOptions  = { method: "GET"
                ,uri: url
                ,headers: { "User-Agent": "Mozilla/5.0" }
                ,encoding: null
            };

request(requestOptions, function(error, response, body) {
  if(error){
    console.log("err??");
  }
  // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
  var strContents = new Buffer(body);
  var body = iconv.decode(strContents, 'EUC-KR').toString();
  var $ = cheerio.load(body);
  // $()
  var tester = $("table tr td.content").text().trim();
  console.log("?????????");
  console.log(tester);
});
// tbody tr td.content div#main_content div#cbox_module div.u_cbox_wrap div.u_cbox_paginate
