var express = require('express');
var config  = require('./config');
var router  = require('./router');

var app = express();

app.set('view engine', config.express.viewEngine);
app.set('views',       config.express.viewPath);

app.use(express.static(config.express.staticPath));

for(var attr in router){
    var path = router[attr];
    
    app.use(attr, require(config.express.viewPath + path));
}


app.listen(config.express.port, function () {
  console.log('app is listening at port ' + config.express.port);
});