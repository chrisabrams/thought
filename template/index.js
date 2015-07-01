require('babel/register')({
  ignore: /node_modules\/[^brew]/
})
require('babel/polyfill')

var service = require('./service/index')

service.start()
