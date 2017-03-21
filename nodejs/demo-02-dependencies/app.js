var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function (req, res) {
  var name = req.query.name;

  if(name){
    var md5Value = utility.md5(name);

    res.send(md5Value);
  }else{
    res.send('请在 url 中输入查询参数 name');
  }
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});