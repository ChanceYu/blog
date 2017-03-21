var config     = {}
var PRODUCTION = process.env.NODE_ENV === 'production'

config.express = {
  port:       process.env.EXPRESS_PORT || 3000,
  viewEngine: 'jade',
  viewPath:   __dirname + '/views',
  staticPath: __dirname + '/static'
}

config.mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || 'localhost'
}

module.exports = config;