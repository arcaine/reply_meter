var webdriverio = require('webdriverio');
var cheerio = require('cheerio');
// var client = webdriverio.remote(options);

var getid = function(a){
  var a =a.split(",");
  var a = a[0];
  var a = a.split(":");
  var a = a[1];
  var c = parseInt(a);
  return c
  }
// #cbox_module div.u_cbox_wrap div.u_cbox_paginate
var naver_reply_one = function(client,several_reply_result,turns,callback) {
  var k =0;
    client
        .click('div#cbox_module div.u_cbox_paginate a.u_cbox_btn_more')
        .catch(function (err) {
  // console.log(err);
          console.log(err)
          k =1;
        })
        .getHTML('body')
        .then(function (html) {
          var $ = cheerio.load(html);
          // console.log('hmm')
          // var btn_1 = $('div.alex_more a.link_fold');
          // console.log(typeof btn_1);
          if(turns>10||k===1){
            // console.log('finished'+turns.toString())
            var post_list = $("div.u_cbox_content_wrap ul.u_cbox_list li");
            // console.log(post_list);
            post_list.each(function(){
              // console.log(this)
              var comment =$(this).find('div.u_cbox_comment_box div.u_cbox_area')
              // console.log(comment.text())
              var re_author = $(this).find('div.u_cbox_comment_box div.u_cbox_area span.u_cbox_nick').text().trim();
              // console.log(re_author);
              var contents = comment.find('div.u_cbox_text_wrap').text().trim();
              // console.log(contents)
              var reply_id = $(this).attr('data-info');
              // console.log(reply_id)
              var reply_id ="nc" + getid(reply_id);
              // console.log(reply_id)
              // var reply_id = "dc"+getid(reply_id)
              // var contents = $(this).find('div p.desc_txt').text();
              // var re_reply = null;
              var re_date = comment.find('span.u_cbox_date').text().trim();
              // console.log(re_date);
              // if($(this).find('a.reply_count span span.num_txt').text()){
                // re_reply = $(this).find('a.reply_count span span.num_txt').text()
                // re_reply = parseInt(re_reply);
              // }
              // console.log('???');
              // console.log(re_author);
              var one_reply_result = {
                re_author : re_author,
                re_contents : contents,
                re_date : re_date,
                re_reply : null,
                reply_likes : null,
                reply_hates : null
              };

              several_reply_result[reply_id] = one_reply_result;

              // console.log(several_reply_result);
            });
            client.end();
            // console.log(Object.size(several_reply_result));
            callback(several_reply_result);
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!?");
          }else{
            // console.log('!!!!!!!!!!!');
            // console.log(turns)
            client
            .call(naver_reply_one(client,several_reply_result,turns+1,callback));
          };
        })

}
// clickAction(several_reply_result,0);
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};




var naver_reply_loop = function(result_obj,url_list,callback){
  var options = {desiredCapabilities: {browserName: 'chrome'}};
  var result = [];
  var client = webdriverio.remote(options);
  var portal_id = url_list[0][0];
  var url = url_list[0][1]+"&m_view=1";
  var several_reply_result = {}
  client = client.init();
  client
      .url(url)
      // .timeouts('page load',1000000)
      .timeouts('script',1000000)
      .waitForVisible('div#cbox_module div.u_cbox_paginate',1000000)
      .then(
        console.log(portal_id)
      )
      .catch(function(err){
        console.log('server ok?')
      })
      .then(
        setTimeout(function(){
          naver_reply_one(client,several_reply_result,0,function(result){
              // console.log(portal_id)
              // console.log(result);
              // console.log(url_list);
              result_obj[portal_id] = result
              url_list.shift();
              // console.log(result_obj);
              // console.log(url_list);
              // console.log(url_list.length);
              if(url_list.length>0){
                naver_reply_loop(result_obj,url_list,callback)
              }else{
                callback(result_obj)
              }
            })
        },20000)

      );
}
// var result_obj = {};

// daum_reply_loop(result_obj,test_set,function(data){
  // console.log(data);
// });

var naver_reply = function(input_list,callback){
  var url_list = [];
  for(i in input_list){
      var z = [i,input_list[i]];
      url_list.push(z);
  };
  var result_obj = {};
  naver_reply_loop(result_obj,url_list,function(data){
    callback(data)
  })
};

//naver_reply 용례
// var test_set = {"a":"http://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=101&oid=001&aid=0009101886", b:"http://news.naver.com/main/hotissue/read.nhn?mid=hot&sid1=100&cid=1059834&iid=49421986&oid=008&aid=0003836885&ptype=052"}
// naver_reply(test_set,function(data){
  // console.log('finished')
  // console.log(Object.size(data))
  // console.log('_____________________________________________________________________!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  // console.log(data)
// });

    // .setValue('#query', 'nodejs')
    // .click('div.alex_more a.link_fold')
    // .getHTML('body')
    // .then(function (html) {
    //   var $ = cheerio.load(html);
    //   var btn_1 = $('div.alex_more a.link_fold').text();
    //   while(btn_1 === undefined){
    //
    //   }else{
    //
    //   };
    //
    //     var post_list = $("ul.list_comment")
    //     post_list.each(function(){
    //       var a = $(this).find('li div p.desc_txt').text();
    //       var b = $(this).find('div.alex_more a.link_fold').text();
    //       console.log(b);
    //       console.log(a);
    //       result.push(a);
    //     });
    //     console.log(a[a.length-1]);
    // });
exports.module = naver_reply;
