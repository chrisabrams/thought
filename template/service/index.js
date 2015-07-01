var path    = require('path'),
    Service = require('brew-service')

var service = new Service({
  port: 7000,
  routesPath: path.join(__dirname, '../routes/index.js'),
  serviceName: '{{appName}}'
})

var routes = require('../lib/router')

routes.forEach(function(route) {

  service.add(route)

})

module.exports = service
