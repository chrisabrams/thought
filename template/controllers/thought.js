var Brazier = require('brazier'),
    config  = require('../../lib/config'),
    db      = require('../../lib/db'),
    fs      = require('fs'),
    mkdirp  = require('mkdirp'),
    path    = require('path'),
    r       = require('rethinkdb')

class ThoughtController extends Brazier.Controller {

  constructor() {
    super()
  }

  createDb(dbName, cb) {

    db.connect( (err, connection) => {

      r.dbCreate(dbName).run(connection, cb)

    })

  }

  createTable(cb) {

    db.connect( (err, connection) => {

      r.db(config.db).tableCreate(key, {primaryKey: 'id'}).run(connection, cb)

    })

  }

}

module.exports = ThoughtController
