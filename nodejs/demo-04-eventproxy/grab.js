var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var app = express();

var siteUrl = 'http://baijia.baidu.com';
var siteUrlObj = url.parse(siteUrl, true);

var absoluteUrl = siteUrlObj.protocol + '//' + siteUrlObj.host;
var arr = (absoluteUrl + siteUrlObj.pathname).split('\/');
var relativeUrl = arr.slice(0, arr.length-1).join('\/');

app.get('/', function (req, response) {
  superagent.get(siteUrl)
  .end(function (err, res) {
    if (err || res.statusCode != 200) {
      console.error(err || res);

      return response.send(siteUrl + '<span style="color:red">链接失效</span>');
    }

    var sendContent = res.text;

    //replace src href or other links(data-original for jquery-lazyload)
    /*sendContent = sendContent.replace(/((src|href|data-original)=['"])(\/|..\/)/g, function($0, $1, $2, $3){
      if($3 == '/'){
        return $1 + absoluteUrl +'/';
      }else{
        return $1 + relativeUrl +'/../';
      }
    });*/

    var $ = cheerio.load(sendContent);
    var news = [];

    $('.feeds-item').each(function(idx, elem){
      var $elem = $(elem);

      news.push({
        img: $elem.find('.feeds-item-pic img').attr('src'),
        title: $elem.find('h3 a').text(),
        href: $elem.find('h3 a').attr('href'),
        summary: $elem.find('.feeds-item-text1').text()
      });
    });

    news.forEach(function(item, idx){
      news[idx] = '<tr>'+
                    '<td><img src="'+ item.img +'" style="width:200px;height:120px;"></td>' +
                    '<td><a href="'+ item.href +'">'+ item.title +'</a></td>' +
                    '<td><p>'+ item.summary +'</p></td>' +
                  '</tr>';

    });

    var resultContent = '<h2 style="text-align:center;padding:50px;">NodeJS抓取：百度百家-首页新闻</h2><table>'+ news.join('') +'</table>';

    response.send(resultContent);
  });
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});

