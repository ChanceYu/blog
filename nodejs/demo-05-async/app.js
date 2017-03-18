var express = require('express');
var async = require('async');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var app = express();

var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function (req, response) {
  superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var topics = [];
    var $ = cheerio.load(res.text);

    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      var href = url.resolve(cnodeUrl, $element.attr('href'));

      topicUrls.push(href);
    });

    //reduce request number
    topicUrls.splice(5);

    async.mapLimit(topicUrls, 2, function (url, callback) {
      superagent
        .get(url)
        .end(function (err, resSup) {
            callback(null, resSup.text);
        });
    }, function (err, result) {
        response.send(result);
    });
  });
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

