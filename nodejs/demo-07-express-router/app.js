var express = require('express');
var config  = require('./config');
var app     = express();

var configRouter = function(path){
  return require(config.express.viewPath + path)
};

app.use(express.static(config.express.staticPath));
app.set('view engine', config.express.viewEngine);
app.set('views',       config.express.viewPath);

app.use('/',      configRouter('/index/router'));
app.use('/about', configRouter('/about/router'));


app.listen(config.express.port, function () {
  console.log('app is listening at port ' + config.express.port);
});