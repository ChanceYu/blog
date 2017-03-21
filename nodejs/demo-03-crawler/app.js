var express    = require('express');
var cheerio    = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function(req, res, next) {
    var url = 'http://r.qidian.com/click?style=1&dateType=3';

    superagent
        .get(url)
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];

            $('.book-mid-info').each(function(idx, element) {
                var $element = $(element);
                var $link = $element.find('h4 a');
                var str = '<a href="'+ $link.attr('href') +'">'+ $link.text() +'</a>';
                
                items.push(str);
            });

            res.send(items.join('<br>'));
        });
});


app.listen(3000, function() {
    console.log('app is listening at port 3000');
});