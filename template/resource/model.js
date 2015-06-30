var config        = require('../../lib/config'),
    db            = require('../../lib/db'),
    r             = require('rethinkdb'),
    ResourceModel = require('../base/model'),
    schema        = require('./schema')

/*
# {{resourceName}}Model
*/
class {{resourceName}}Model extends ResourceModel {

  constructor(options = {}) {

    options.schema = options.schema || schema

    super(options)

  }

  /**
  # Create new resource entity.

  @param {Object} options passed in
  @param {Function} callback

  @rethinkApi http://rethinkdb.com/api/javascript/insert/
  **/

  create(pkg, options = {}, cb) {

    let defaults = {
      conflict      : 'error',
      durability    : 'hard',
      returnChanges : true
    }

    if(arguments.length == 2) {
      cb = arguments[1]
    }

    if(arguments.length === 3) {
      options = Object.assign(defaults, options)
    }

    else {
      options = Object.assign(defaults)
    }

    db.connect( (err, connection) => {

      r.db(config.db).table(this.table).insert(pkg, options).run(connection, (err, result) => {

        connection.close()

        if(!err) result = result.changes[0].new_val

        cb(err, result)

      })

    })

  }

  deleteById(id, cb) {

    this.updateById(id, {recordStatus: 'deleted'}, cb)

  }

  destroyById() {



  }

  /*getAll(cb) {

    db.connect( (err, connection) => {

      r.db(config.db).table(this.table).run(connection, (err, result) => {

        connection.close()

        cb(err, result)

      })

    })

  }*/

  getById(id, cb) {

    db.connect( (err, connection) => {

      r.db(config.db).table(this.table).get(id).run(connection, (err, result) => {

        connection.close()

        cb(err, result)

      })

    })

  }

  updateById(id, pkg, options, cb) {

    let defaults = {
      durability    : 'hard',
      returnChanges : true
    }

    if(arguments.length == 3) {
      cb = arguments[2]
    }

    if(arguments.length === 4) {
      options = Object.assign(defaults, options)
    }

    else {
      options = Object.assign(defaults)
    }

    db.connect( (err, connection) => {

      r.db(config.db).table(this.table).get(id).update(pkg, options).run(connection, (err, result) => {

        connection.close()

        if(!err) result = result.changes[0].new_val

        cb(err, result)

      })

    })

  }

}

{{resourceName}}Model.prototype.table = '{{lowerCase resourceName}}'

module.exports = {{resourceName}}Model
