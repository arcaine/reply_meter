var Promise = require('promise');

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
        var article_s = $(this).find("div.cont_thumb span.info_news").text().trim();
        var article_company =article_s.split("·")[0].trim()
        var article_wr_time = article_s.split("·")[1].trim()
        var article_url = $(this).find("div.cont_thumb a").attr("href");
        var article_id = getid(article_url)
        // console.log(article_id)
        // console.log("title: "+article_name)
        // console.log("company: "+article_company)
        // console.log("url: "+article_url)
        var a = {
          title:article_name,
          company:article_company,
          url:article_url,
          wr_time:article_wr_time
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

var gtd = function(pagelimit,callback){
  big = {}
  var page =1
  getalldata(1,pagelimit,function(data){
    callback(data)
  })
}

gtd(1,function(big1){
  console.log(Object.size(big1))
  console.log(big1)
})

// function getalldata(pagelimit, callback){
//   var big = {}
//   var a = []
//   var b = 1
//   for(var c = 1;  c<pagelimit+1;c++){
//     a[c]=c
//   }
//   if(b<=a.length){
//     getdata(a[b],function(result){
//       if(result.length>1){
//       big = merge(big,result)
//         b = b+1
//       }
//     })
//   }
//   process.nextTick(function(){callback(big)},5000)
// }
//
// getalldata(3,function(big){
//   console.log(big)
// })



// getalldata_right = function(i,limit,callback){
//   var big ={}
//   setTimeout(function(){
//     getdata(i,function(){
//
//     })
//     if(i>=limit){
//       callback();
//     }else{
//       getdata(i,function(data){
//         big = merge(big,data)
//       })
//     }
//   })
// }
// var getalldata = function(pagelimit){
//   var list = []
//   for(i = 0; i<pagelimit+1; i++){
//     list[i] = i
//   }
//
//   var big = {}
//   for(page=0;page<pagelimit+1;page++){
//     getdata(page,function(result){
//       big = merge(big,result)
//     })
//   }
//       return new Promise(function(resolved,rejected){
//            setTimeout(
//                  function(){
//                        resolved(big);
//                  },2000);
//       });
//
// // }
//
// function getalldata_sync(pagelimit){
//   return new Promise(function (fulfill, reject){
//     getalldata(pagelimit, function (data){
//       settimeout(function(){
//         fulfill(data)
//       },2000)
//     });
//   });
// }
// var get = getalldata_sync(10)
// get.then(console.log(data),console.err)
