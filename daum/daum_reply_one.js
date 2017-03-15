var webdriverio = require('webdriverio');
var cheerio = require('cheerio');
var options = {desiredCapabilities: {browserName: 'chrome'}};
var result = [];
var client = webdriverio.remote(options);
client = client.init();

var getid = function(a){
   var b = a.toString()
   var c = b.substring(b.length,b.length-9)
   return c
  }


client
    .url('http://v.media.daum.net/v/20170312134648678')
    .timeouts('script',90000);

  client.executeAsync(function(done){
    console.log('this should not fail');
    setTimeout(done, 59000);
  });



var several_reply_result = {}
var clickAction = function(several_reply_result,turns) {
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
              console.log(re_author);
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
            console.log(several_reply_result);
            client.end();
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!?");
          }else{
            client
            .call(clickAction(several_reply_result,turns+1));
          };
        })

}
clickAction(several_reply_result,0);


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
