var express = require('express');

var app = express();

app.use(express.static(__dirname + '/src'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/src');


app.get('/', function (req, res) {
    res.render('views/index', {
        list: ['', '', '']
    });
});
app.get('/index', function (req, res) {
    res.render('views/index', {
        list: ['', '', '']
    });
});

app.listen(3000, function () {
  console.log('app is listening at port 3000');
});