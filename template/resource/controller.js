var ResourceController = require('../base/controller')

class {{resourceName}}Controller extends ResourceController {

  constructor(options = {}) {

    super(options)

    this.model = new this.Model()

  }

  /*
  @docs: http://rethinkdb.com/api/javascript/insert/
  */
  create(req, res, cb) {

    let pkg = req.body

    this.model.create(pkg, (err, result) => {

      this.response({
        err,
        pkg: result,
        statusCode: this.statusCodes.create
      }, res, cb)

    })

  }

  /*createTable(cb) {

    db.connect( (err, connection) => {

      r.db(config.db).tableCreate(key, {primaryKey: 'id'}).run(connection, cb)

    })

  }*/

  deleteById(req, res, cb) {

    this.model.deleteById(req.params.id, (err, result) => {

      this.response({
        err,
        pkg: result,
        statusCode: this.statusCodes.delete
      }, res, cb)

    })

  }

  destroyById() {



  }

  getAll() {



  }

  getById(req, res, cb) {

    this.model.getById(req.params.id, (err, result) => {

      this.response({
        err,
        pkg: result,
        statusCode: this.statusCodes.get
      }, res, cb)

    })

  }

  updateById(req, res, cb) {

    this.model.updateById(req.params.id, req.body, (err, result) => {

      this.response({
        err,
        pkg: result,
        statusCode: this.statusCodes.update
      }, res, cb)

    })

  }

}

{{resourceName}}Controller.prototype.Model = require('./model')

{{resourceName}}Controller.prototype.statusCodes = {
  create : 201,
  delete : 200,
  get    : 200,
  update : 200
}

module.exports = {{resourceName}}Controller
