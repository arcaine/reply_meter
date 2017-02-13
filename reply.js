var request = require("request");
var cheerio = require("cheerio");
var url = "http://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=100&oid=001&aid=0009023721";

request(url, function(error, response, body) {
  if (error) throw error;

  var $ = cheerio.load(body);

  var postElements = $("div.article_header div.article_info");
  postElements.each(function() {
    var postTitle = $(this).find("h3").text();
    // var postUrl = $(this).find("h1 a").attr("href");
		console.log(postTitle)
  });
});
