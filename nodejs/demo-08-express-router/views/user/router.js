var express = require('express');
var users   = require(__dirname + '/users');

var router  = express.Router();

router.get('/', function(req, res){
    res.render(__dirname + '/user', {
        welcome: true,
        users: users
    });
});

router.get('/:md5Id', function (req, res, next) {
    var md5Id = req.params.md5Id;

    var exist = null;

    users.forEach(function(elem){
        if(elem.md5Id == md5Id){
            exist = elem;
        }
    });

    var userName = exist ? exist.name : '';

    res.render(__dirname + '/user', {
        userName: userName,
        users: users
    });
});

module.exports = router;