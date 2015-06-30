var glob = require('glob'),
    path = require('path')

var routePaths = glob.sync(path.join(process.cwd(), './resources/**/routes.js'))

var routes = []

routePaths.forEach( (routePath) => {

  routes.push(require(routePath))

})

module.exports = routes
