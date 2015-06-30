var config = require('./config'),
    DB     = {},
    r      = require('rethinkdb')

DB.connect = (cb) => {

  r.connect({
    db:   config.db,
    host: config.host,
    port: config.port
  }, (err, connection) => {

    cb(err, connection, config.db)

  })

}

/*DB.exec = (action, cb) => {

  DB.connect( (err, connection, db) => {

    if(err) return cb(err)

    action(r.db(db)).run(connection, (err, result) => {

      connection.close()

      if(err) return cb(err)

      cb(null, result)

    })

  })

}*/

module.exports = DB
