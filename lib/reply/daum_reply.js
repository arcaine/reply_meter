var webdriverio = require('webdriverio');
var cheerio = require('cheerio');
// var client = webdriverio.remote(options);

var getid = function(a){
   var b = a.toString()
   var c = b.substring(b.length,b.length-9)
   return c
  }

var daum_reply_one = function(client,several_reply_result,turns,callback) {
  var k =0;
    client
        .click('div.alex_more a.link_fold')
        .catch(function (err) {
  console.log('error!!');
        k =1;
        })
        .getHTML('body')
        .then(function (html) {
          var $ = cheerio.load(html);
          // var btn_1 = $('div.alex_more a.link_fold');
          // console.log(typeof btn_1);
          if(turns>200||k===1){
            var post_list = $("ul.list_comment li")
            post_list.each(function(){
              var re_author = $(this).find('div.cmt_info strong span.info_author a.link_nick.clickable').text().trim();
              var reply_id = $(this).attr('id');
              var reply_id = "dc"+getid(reply_id)
              var contents = $(this).find('div p.desc_txt').text();
              var re_reply = null;
              if($(this).find('a.reply_count span span.num_txt').text()){
                re_reply = $(this).find('a.reply_count span span.num_txt').text()
                re_reply = parseInt(re_reply);
              }
              // console.log(re_author);
              var one_reply_result = {
                re_author : re_author,
                re_contents : contents,
                re_date : null,
                re_reply : re_reply,
                reply_likes : null,
                reply_hates : null
              }
              several_reply_result[reply_id] = one_reply_result;
              // console.log(several_reply_result)
            });
            client.end();
            callback(several_reply_result);
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!?");
          }else{
            client
            .call(daum_reply_one(client,several_reply_result,turns+1,callback));
          };
        })

}
// clickAction(several_reply_result,0);

var daum_reply_loop = function(result_obj,url_list,callback){
  var options = {desiredCapabilities: {browserName: 'chrome'}};
  var result = [];
  var client = webdriverio.remote(options);
  var portal_id = url_list[0][0];
  var url = url_list[0][1];
  var several_reply_result = {}
  client = client.init();
  client
      .url(url)
      .timeouts('script',90000);

  daum_reply_one(client,several_reply_result,0,function(result){
    // console.log(portal_id)
    // console.log(result);
    // console.log(url_list);
    result_obj[portal_id] = result
    url_list.shift();
    // console.log(result_obj);
    // console.log(url_list);
    // console.log(url_list.length);
    if(url_list.length>0){
      daum_reply_loop(result_obj,url_list,callback)
    }else{
      callback(result_obj)
    }
  });
}
// var result_obj = {};

// daum_reply_loop(result_obj,test_set,function(data){
  // console.log(data);
// });

var daum_reply = function(input_list,callback){
  var url_list = [];
  for(i in input_list){
      var z = [i,input_list[i]];
      url_list.push(z);
  };
  var result_obj = {};
  daum_reply_loop(result_obj,url_list,function(data){
    callback(data)
  })
};

// daum_reply 용례
// var test_set = {"a":"http://v.media.daum.net/v/20170312134648678","b":"http://v.media.daum.net/v/20170312135005711"}

// daum_reply(test_set,function(data){
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
exports.module = daum_reply;
