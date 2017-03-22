var express = require('express');
var path    = require('path');
var config  = require('./config');
var router  = require('./router');

var app = express();

app.set('view engine', config.express.viewEngine);
app.set('views',       config.express.viewPath);

app.use(express.static(config.express.staticPath));

// config router
for(var attr in router){
    var routerPath = router[attr];
    
    app.use(attr, require(config.express.viewPath + routerPath));
}

var errorPath = path.join(__dirname, 'views/error/');

// error 404
app.use(function(req, res, next) {
  res.status(404);
  res.render(errorPath + '404');
});

// error 500
app.use(function(err, req, res, next) {
  res.status(500);
  res.render(errorPath + '500', { error: err });
});


app.listen(config.express.port, function () {
  console.log('app is listening at port ' + config.express.port);
});