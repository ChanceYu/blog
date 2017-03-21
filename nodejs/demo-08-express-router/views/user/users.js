var utility = require('utility');

var users = [{
    id: 6,
    name: '小张'
},{
    id: 12,
    name: '小明'
},{
    id: 65,
    name: '小莉'
}];

users.forEach(function(elem){
    var _md5Id = utility.md5(elem.id + '');

    elem.md5Id = _md5Id;
});

module.exports = users;