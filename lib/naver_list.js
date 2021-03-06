

// //naver 리스트 용례
// naver_list('2017-03-14','2017-03-16',2,"politics",function(data){
//   console.log(data)
// });
//
// module.exports = naver_list;
// module.exports = naver_list_date_loop;
// module.exports = naver_list_loop;


module.exports = function(){
  var request = require("request");
  var cheerio = require('cheerio');
  var iconv  = require('iconv-lite');


  var get_date_list = function(start_date,end_date,format){
    var moment = require('moment');
    var a = moment(start_date);
    var b = moment(end_date);
    var date_list = [];
    for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
      date_list.push(m.format(format));
    }
    return(date_list);
  }

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


  var naver_list_loop =function(several_times, page, pagelimit, sid, date, callback){
    var url = "http://news.naver.com/main/list.nhn?sid1="+sid.toString()+"&listType=title&mid=sec&mode=LSD&date="+date.toString()+"&page="+page.toString()
    var requestOptions  = { method: "GET"
                    ,uri: url
                    ,headers: { "User-Agent": "Mozilla/5.0" }
                    ,encoding: null
                };
    request(requestOptions, function(error, response, body) {
      if(error) console.log (error);
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
          var press = $(this).find("span.writing").text().trim();
          var wr_date = $(this).find("span.date").text().trim();
          var scrap_date = getTimeStamp();
          var one_article = {
            category:"politics",
            portal_url:article_url,
            title: article_name,
            cover: null,
            press: press,
            date:wr_date,
            scrap_date:scrap_date,
            portal_name:'naver'
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



  var naver_list_date_loop = function(result,date_list,pagelimit,category,callback){
    var several_times = {};
    var page = 1;
    var date = date_list[0];
    console.log(date);
    date_list.shift();
    if(category === "politics"){
      var sid =100
    }
    naver_list_loop(several_times,page,pagelimit,sid,date,function(data){
      result = merge(result,data)
      if(date_list.length>0){
        naver_list_date_loop(result,date_list,pagelimit,category,callback)
      }else{
          callback(result);
      }
    });
  };

  var naver_list = function(start_date,end_date,page_limit,category,callback){
    var result = {};
    var date_list = get_date_list(start_date,end_date,"YYYYMMDD");
    naver_list_date_loop(result,date_list,page_limit,category,function(data){
      callback(data)
    });
  };
  return naver_list;
}
