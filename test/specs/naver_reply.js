// var webdriverio = require('webdriverio');
var Launcher = require('webdriverio').Launcher;
var cheerio = require('cheerio');

var getid = function(a){
  var a =a.split(",");
  var a = a[0];
  var a = a.split(":");
  var a = a[1];
  var c = parseInt(a);
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

// http://v.media.daum.net/v/20170312134648678
// var url_list =[["a",{"portal_url":"http://news.naver.com/main/hotissue/read.nhn?mid=hot&sid1=100&cid=1051768&iid=2180578&oid=001&aid=0009120580&ptype=052&m_view=1"}],["b",{"portal_url":"http://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=100&oid=001&aid=0009121205&m_view=1"}]];
// ,["b",{"portal_url":"http://v.media.daum.net/v/20170319205451827"}]



      var fs = require('fs');




browser.timeouts('script', 10000000);
browser.timeouts('implicit', 10000000);
  browser.timeouts('page load', 1000000);
// browser.timeouts


var mysql_reply = require('../../lib/mysql/mysql_reply.js')

var mysql = require('mysql');
var fs = require('fs');
// var path = process.cwd();
var config = require('../../config/config.js');
var start_date = config.start_date;
var end_date = config.end_date;


var async = require('async');

var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'reply_meter'
});
conn.connect();


objsize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
var reply_save =mysql_reply.reply_save;
// browser.pause(100000);

//async waterfall 사용하기
// browser.url('www.naver.com')

// browser.pause(5000)

        // var url_list = {};
    // var url_list = {};
    // arg1는 '하나'고, arg2는 '둘'이다.
    describe('crawling reply', function() {
      before(function() {
        var find_list = require('../../lib/mysql/find_list.js')(conn);
        var find_url = require('../../lib/mysql/find_url.js')(conn,objsize);

        var moment = require('moment');

        var fs = require('fs');

        var reply_save =mysql_reply.reply_save;
        var listing = mysql_reply.listing;
         find_list(start_date,end_date,'naver',function(data){
          find_url(data,function(input_list){
            listing(input_list,function(url_list_){
              console.log('process 1 done')
              browser.url_list = url_list_
              console.log(browser.url_list)
              // done();
              // callback(null, url_list);
            });
          });
        });
      });
      describe('itstherealone',function(){
        it('naver', function() {
          // browser.url_list =[['a',{"portal_url":"http://news.naver.com/main/ranking/read.nhn?mid=etc&sid1=111&rankingType=popular_day&oid=025&aid=0002699317&date=20170329&type=1&rankingSeq=2&rankingSectionId=100"}]]
          browser.waitUntil(function(){
            return browser.url_list != undefined
          })
          // console.log(Object.url_list)
          // console.log(browser.url_list)
          url_list =browser.url_list
            // fs.readFile('../../result_naver.json','utf8',function(err,data){
                console.log('process2 start')
                  url_list = browser.url_list;
                  console.log(url_list);
                  var result = {};
                  for(i in url_list){
                    // console.log(url_list[i])
                    var url = url_list[i][1].portal_url+"&m_view=1";
                    var portal_id = url_list[i][0];
                    console.log(portal_id)
                    // while(typeof url != 'string'){
                    //   setTimeout(function(){
                    //     console.log('waiting')
                    //   },300)
                    // }
                    // console.log(url);
                    // setTimeout(function(){
                    browser.url(url);
                    console.log(browser.getUrl());
                    browser.pause(1000);
                    var comments =browser.getHTML('body');
                    var cheerio_obj = cheerio.load(comments);
                    var cheerio_obj_length = cheerio_obj('div#cbox_module').find('span.u_cbox_contents_none').text().length;
                    console.log('길이는')
                    console.log(cheerio_obj_length)
                    if(cheerio_obj_length===0){
                        browser.pause(10000);
                        var a = browser.$$('div#cbox_module div.u_cbox_paginate')[0].getCssProperty('display');

                      var result_one ={};
                      var several_reply_result = {};
                      var k = 0;

                      while(a.value==='block'){
                        console.log('cick!')

                            browser.click('div#cbox_module div.u_cbox_paginate')
                            browser.pause(500);
                            a = browser.$$('div#cbox_module div.u_cbox_paginate')[0].getCssProperty('display');

                            console.log(a)

                      }
                      var post_list =browser.$$("div.u_cbox_content_wrap ul.u_cbox_list li");
                      for(i in post_list){
                        var post = post_list[i];
                        var re_author = post.$('div.u_cbox_comment_box div.u_cbox_area span.u_cbox_nick').getText().trim();
                        var reply_id = post.getAttribute('data-info');
                        var reply_id = "nc"+getid(reply_id);
                        var contents = post.$('div.u_cbox_text_wrap').getText();
                        var scrap_date = getTimeStamp();
                        var re_reply = null;
                        var re_date = post.$('span.u_cbox_date').getText().trim();

                        var one_reply_result = {
                          re_author : re_author,
                          re_contents : contents,
                          re_date : re_date,
                          scrap_date : scrap_date,
                          re_reply : null,
                          reply_likes : null,
                          reply_hates : null,
                          portal_name : 'naver'
                        }
                        // console.log(one_reply_result);
                        several_reply_result[reply_id] = one_reply_result;
                        console.log(several_reply_result);
                      }
                      console.log(portal_id)
                        result_one[portal_id] = several_reply_result;
                        console.log(result_one)
                        reply_save(result_one,function(){
                          console.log('save done')
                      })
                    }else{
                      console.log('댓글이 없으니 넘어갑시다')
                    }
                  };
                // });
                // });//콜백지옥 라스트
                  // }//url_list 일시 함수
                // };
              // });
            // });
          });
      });
    });
