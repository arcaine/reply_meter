var request = require("request");
var cheerio = require('cheerio');
var iconv  = require('iconv-lite');
var moment = require('moment');

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
  var getid = function(a){
   var b = a.toString()
   var c = b.substring(b.length,b.length-17)
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


  function checkday(timestamp, wrtime){
    var a = timestamp.split(' ')
    a = a[1].split(':')
    // console.log(a)
    var b = parseInt(a[0])*60+parseInt(a[1])
    var c = wrtime.split(':')
    // console.log(c)
    var d = parseInt(c[0])*60 + parseInt(c[1])
    var e = timestamp.split(' ')
    var f = []
    // console.log(b);
    // console.log(d);
    if (b>=d){
      // console.log(1)
      f.push(e[0]);
      var g = [c[0],c[1]];
      g = g.join(':')
      f.push(g);
      // console.log(f);
      wrtime = f.join(' ');
    }else{
      // console.log(2)
      // console.log('!!!!!!!!!!')
      new_e = e[0].split('-');
      // console.log(new_e);
      new_e[2] ='0'+(parseInt(new_e[2])-1).toString();
      // console.log(new_e);
      e =  new_e.join('-');
      // console.log(e);
      f.push(e);
      var g = [c[0],c[1]];
      g = g.join(':')
      f.push(g);
      // console.log(f);
      wrtime = f.join(' ');
    }
    return(wrtime)
  }



  // for (var page =1 ; page <30 ; page++){
  function getdata(date, page, category, callback){
    var url = "http://media.daum.net/breakingnews/"+category+"?page="+page.toString()+"&regDate="+date.toString();
    console.log(url);
    var requestOptions  = { method: "GET"
                    ,uri: url
                    ,headers: { "User-Agent": "Mozilla/5.0" }
                    ,encoding: null
                };

    // request 모듈을 이용하여 html 요청
    var result = {}
    request(requestOptions, function(error, response, body) {
      // 전달받은 결과를 EUC-KR로 디코딩하여 출력한다.
      // var strContents = new Buffer(body);
      // var body = iconv.decode(strContents, 'EUC-KR').toString();
      var $ = cheerio.load(body);
      var postlists = $("ul.list_news2 li");
      // console.log(postlists)
      postlists.each(function(){
        // console.log("ha?")
        // var article_lists = $(this).find("li")
        // article_lists.each(function(){
          var article_name = $(this).find("div.cont_thumb a").text().trim();
          var article_s = $(this).find("div.cont_thumb span.info_news").text().trim();
          var article_company =article_s.split("·")[0].trim()
          var article_wr_time = article_s.split("·")[1].trim()
          var wrt = moment(date,'YYYYMMDD').format('YYYY-MM-DD')+" "+article_wr_time
          var article_url = $(this).find("div.cont_thumb a").attr("href");
          var article_id = getid(article_url);
          var article_cover = $(this).find("img.thumb_g").attr("src");
          var timestamp = getTimeStamp();
          // var wrt = checkday(timestamp, article_wr_time);

          var a = {
            category : category,
            portal_url:article_url,
            title:article_name,
            cover: article_cover,
            press:article_company,
            date:wrt,
            scrapdate:timestamp,
            portal_name : 'daum'
          }
          // console.log(a);
          result["d"+article_id] = a
        // });
      });
      // console.log(body);
      //일단은 전체 내용은 디코드하기 -> 그다음에 cheerio 처리등을 진행해야 함
      // console.log(result)
      // console.log(page)
      // console.log("________________________________")
      callback(result)
    });
  }
  //
  // function getalldata(pagelimit, callback){
  //   var big = {}
  //   for(i = 0; i<pagelimit+1; i++){
  //     getdata(page,function(result){
  //       big = merge(big,result)
  //     });
  //   callback(big)
  // // }
  // getdata(1,function(data){
  //   console.log(data)
  // })
  Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
  };
  // var big = {}
  var getalldata =function(date,page,pagelimit,category,callback){
      getdata(date,page,category,function(data){
        // var temp_var ={page: page+"__________________________"}
        big = merge(big,data)
        console.log(page);
        // big = merge(big,temp_var)
        if (page >=pagelimit){
          callback(big)
        }else{
          getalldata(date,page+1,pagelimit,category,callback);
        }
      })
  }

  var daum_list_loop = function(result,date_list,pagelimit,category,callback){
    big = {};
    var page =1;
    var date = date_list[0];
    console.log(date);
    date_list.shift();
    getalldata(date,1,pagelimit,category,function(data){
      result = merge(result,data)
      if(date_list.length>0){
        daum_list_loop(result,date_list,pagelimit,category,callback)
      }else{
        callback(result)
      }
    });
  }
  var daum_list = function(start_date,end_date,pagelimit,category,callback){
    var result = {};
    var date_list = get_date_list(start_date,end_date,"YYYYMMDD");
    daum_list_loop(result,date_list,pagelimit,category,function(data){
      callback(data);
    })
  };

//용례
daum_list('2017-03-15','2017-03-16',2,"politics",function(data){
  console.log(data);
});

module.exports = daum_list;
