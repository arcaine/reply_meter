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

function getTimeStamp() {
  var d = new Date();

  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

  return s;
}

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}


var naver_article = function(input_list,callback){
  var url_list = [];
  for(i in input_list){
      var z = [i,input_list[i]];
      url_list.push(z);
  };
  var result_list = {};
  naver_article_loop(result_list,url_list,function(data){
    callback(data);
  });
};

var naver_article_loop = function(result_list,url_list, callback){
  var portal_id = url_list[0][0];
  var url = url_list[0][1].portal_url;
  console.log(url);
  // var url = "http://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=100&oid=016&aid=0001207562"
  var requestOptions  = { method: "GET"
                  ,uri: url
                  ,headers: { "User-Agent": "Mozilla/5.0" }
                  ,encoding: null
              };

  request(requestOptions, function(error, response, body) {
    if(error) console.log(error);
    // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
    var strContents = new Buffer(body);
    var body = iconv.decode(strContents, 'EUC-KR').toString();
    var $ = cheerio.load(body, { decodeEntities: false });
    var title = $("div.article_info h3").text().trim();
    var contents = $("div#articleBodyContents");
    contents.find("script").remove();
    var contents = contents.html();
    // var wr_date = $("div.article_info div.sponsor").find("span.t11").text().trim();
    var scrap_date = getTimeStamp();
    var original_url =  $("div.article_info div.sponsor").find("div.article_btns a.pi_btn").attr('href');
    // var likes = parseInt(likes);
    var a = {
      "title": title,
      "contents": contents,
      "author":null,
      // "wr_date":wr_date,
      "scrap_date":scrap_date,
      "original_url":original_url,
      "likes":null
    };
    // console.log(a);
    result_list[portal_id] = a;
    url_list.shift()
    // console.log(url_list);
    // console.log("length:"+url_list.length)
    // console.log(result_list)
    if(url_list.length>0){
      naver_article_loop(result_list, url_list, callback)
    }else{
      callback(result_list);
    };
  });
};


// var test_set = {"a":"http://news.naver.com/main/hotissue/read.nhn?mid=hot&sid1=100&cid=1059743&iid=25862660&oid=001&aid=0009097358&ptype=052","b":"http://news.naver.com/main/ranking/read.nhn?mid=etc&sid1=111&rankingType=popular_day&oid=001&aid=0009097511&date=20170310&type=1&rankingSeq=1&rankingSectionId=100"};
// naver_article(test_set,function(data){
//   console.log(data);
// });

module.exports = naver_article;
