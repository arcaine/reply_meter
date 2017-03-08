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


var naver_list_loop =function(several_times, page, pagelimit, sid, date, callback){
  var url = "http://news.naver.com/main/list.nhn?sid1="+sid.toString()+"&listType=title&mid=sec&mode=LSD&date="+date.toString()+"&page="+page.toString()
  var requestOptions  = { method: "GET"
                  ,uri: url
                  ,headers: { "User-Agent": "Mozilla/5.0" }
                  ,encoding: null
              };
  request(requestOptions, function(error, response, body) {
    if(error) throw error;
    var strContents = new Buffer(body);
    var body = iconv.decode(strContents, 'EUC-KR').toString();
    var $ = cheerio.load(body);
    var postlists = $("div.list_body ul");
    var one_time = {};
    postlists.each(function(){
      var article_lists = $(this).find("li");

      article_lists.each(function(){
        var article_name = $(this).find("a").text().trim();
        var article_url = $(this).find("a").attr("href");
        var article_id = getid(article_url)
        var one_article = {
          title: article_name
        };
        one_time["n"+article_id] = one_article
      });
    });
    var key_ = Object.keys(one_time)
    var key_last = key_[key_.length-1]
    var all_key_ = Object.keys(several_times)
    var all_key_last = all_key_[all_key_.length-1]
    // console.log(one_time)
    // console.log(page)
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    if(page>pagelimit || key_last === all_key_last){
      callback(several_times);
    }else{
      several_times = merge(several_times,one_time)
      naver_list_loop(several_times,page+1,pagelimit,sid,date,callback)
    }
  });
};



var naver_list = function(pagelimit,category,date,callback){
  var several_times = {};
  var page = 1;
  if(category === "politics"){
    var sid =100
  }
  naver_list_loop(several_times,page,pagelimit,sid,date,function(data){
    callback(data);
  });
};

//naver 리스트 용례
naver_list(2,"politics",20170308,function(data){
  console.log(data)
});
