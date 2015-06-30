var Controller = require('./controller')

module.exports = (server, options) => {

  var controller = new Controller()

  server.route('/{{resourceName}}/:id')

    .get( (req, res, next) => {
      controller.getById(req, res)
    })
    .post( (req, res, next) => {
      controller.updateById(req, res)
    })
    .delete( (req, res, next) => {
      controller.deleteById(req, res)
    })

  server.route('/{{resourceName}}')

    .put( (req, res) => {
      controller.create(req, res)
    })

}
