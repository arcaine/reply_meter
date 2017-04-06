module.exports = function(){
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

  var find_date = function(p){
    p = p.split(" ");
    // p.shift();
    var h = p[p.length-2].split(".");
    h = h.join("-");
    var k = [h,p[p.length-1]];
    p =k.join(" ");
    return p;
  };


  var daum_check_reply = function(input_list,callback){
    var url_list = [];
    for(i in input_list){
        var z = [i,input_list[i]];
        url_list.push(z);
    };
    console.log(url_list);
    var result_list = {};
    daum_check_reply_loop(result_list,url_list,function(data){
      callback(data);
    });
  };

  var daum_check_reply_loop = function(result_list,url_list, callback){
    var portal_id = url_list[0][0];
    var url = url_list[0][1].portal_url;
    // console.log(url);
    // var url = "http://v.media.daum.net/v/20170310130412212";
    var requestOptions  = { method: "GET"
                    ,uri: url
                    ,headers: { "User-Agent": "Mozilla/5.0" }
                    ,encoding: null
                };

    request(requestOptions, function(error, response, body) {
      if(error) console.log(error);
      var $ = cheerio.load(body, { decodeEntities: false });
      var reply = $('a#alex_counter span.alex-count-area').text().trim();
      var reply = parseInt(reply);
      // console.log(a);
      result_list[portal_id] = reply;
      url_list.shift()
      if(url_list.length>0){
        daum_check_reply_loop(result_list, url_list, callback)
      }else{
        callback(result_list);
      };
    });
  };
  return daum_check_reply;
}


// module.exports = daum_article;
