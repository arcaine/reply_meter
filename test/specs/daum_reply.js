// var webdriverio = require('webdriverio');
var Launcher = require('webdriverio').Launcher;
var cheerio = require('cheerio');
var mysql_reply = require('../../lib/mysql/mysql_reply.js')
var reply_save =mysql_reply.reply_save;

var getid = function(a){
   var b = a.toString()
   var c = b.substring(b.length,b.length-9)
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
var url_list =[["a",{"portal_url":"http://v.media.daum.net/v/20170312134648678"}]];
// ,["b",{"portal_url":"http://v.media.daum.net/v/20170319205451827"}]

browser.timeouts('script', 1000000);
// browser.timeouts('implicit', 1000000);
// browser.timeouts('page load', 1000000);

describe('crwaling reply', function() {
    it('daum', function() {
      var result = {};
      for(i in url_list){
        var url = url_list[i][1].portal_url;
        var portal_id = url_list[i][0];
        browser.url(url);
        // var k = 0;
        // var isExisting = ;
        // console.log('cheasd;l');
        // console.log(isExisting);
        // console.log(isExisting===false);
        var several_reply_result = {};
        var a = browser.isExisting('div.alex_more a.link_fold');
        console.log(typeof a);
        var k = 0;
        // var div_check = browser.$('div.cmt_box');
        // var div_check = div_check.length;
        // console.log(div_check)
        // console.log(whole_reply)
        var post_count_before =browser.$$("ul.list_comment li");
        var count_length_before = post_count_before.length;
        var count_length_after = 0;
        // console.log(count_length_before<count_length_before);
        console.log(a)
        while(a && count_length_before != count_length_after){
          console.log('cick!')

          var post_count_before =browser.$$("ul.list_comment li");
          var count_length_before =post_count_before.length;
          console.log(count_length_before);
            // setTimeout(function(){
              browser.click('div.alex_more a.link_fold')

              // browser.on('error',function(e){
              //   throw(e)
              //   console.log(e.body.value);
              //   a = false;
              //   k = 1;
              // })
              browser.waitForExist('div.alex_more a.link_fold',5000);
              // browser.on('error',function(error){
              //   throw(error)
              // })
              // // div_check = browser.$('div.cmt_box');
              // // div_check = div_check.length;
              //
              // // console.log(div_check)
              // browser
              // browser.then(function(result){
                // console.log(result);
                // if(result===true){
              var b =browser.getHTML('body');
              a = browser.isExisting('div.alex_more a.link_fold')
              var post_count_after =browser.$$("ul.list_comment li");
              var count_length_after =post_count_after.length;
                // }else{
                  // a = false;
                // }
              console.log(a)
              console.log(count_length_after)

              // });
        }
        // console./
        var post_list =browser.$$("ul.list_comment li");
        for(i in post_list){
          var post = post_list[i];
          var re_author = post.$('div.cmt_info strong span.info_author a.link_nick.clickable').getText().trim();
          var reply_id = post.getAttribute('id');
          var reply_id = "dc"+getid(reply_id);
          var contents = post.$('div p.desc_txt').getText();
          var scrap_date = getTimeStamp();
          var re_reply = null;
          var checkexist = post.isExisting('a.reply_count span span.num_txt')
          if(checkexist){
            re_reply = post.$('a.reply_count span span.num_txt').getText()
            re_reply = parseInt(re_reply);
          }
          var one_reply_result = {
            re_author : re_author,
            re_contents : contents,
            re_date : null,
            scrap_date : scrap_date,
            re_reply : re_reply,
            reply_likes : null,
            reply_hates : null,
            portal_name : 'daum'
          }
          console.log(one_reply_result);
          several_reply_result[reply_id] = one_reply_result;
        }
          result[portal_id] = several_reply_result;
      }
      reply_save(result,function(){
        console.log('save done')
      })
    })
    // it('asdad',function(){
    //   browser.url("http://v.media.daum.net/v/20170319205451827");
    //   // var k = 0;
    //   var isExisting = browser.isExisting('div.alex_more a.link_fold')
    //   var several_reply_result = {};
    //   while(isExisting===false){
    //     browser.click('div.alex_more a.link_fold')
    //   }
    //   var a =browser.$$("ul.list_comment li");
    //   for(i in a){
    //     var re_author = a[i].$('div.cmt_info strong span.info_author a.link_nick.clickable').getText().trim();
    //     var reply_id = a[i].getAttribute('id');
    //     console.log(reply_id);
    //   }
    //   // console.log('_____')
    //   // console.log(a);
    // })
  //   it('what is it',function(){
  //     browser.url("http://v.media.daum.net/v/20170319205451827");
  //     var divCount = browser.selectorExecute("//div", function(divs, message) {
  //      return divs[0];
  //  }, " divs on the page");
  //     console.log(divCount); // returns, for example, "68 divs on the page"
  //   });
});
