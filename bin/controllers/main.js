var Brazier  = require('brazier'),
    cpr      = require('cpr'),
    exec     = require('child_process').exec,
    fs       = require('fs'),
    mkdirp   = require('mkdirp'),
    path     = require('path'),
    r        = require('rethinkdb'),
    sh       = require('execSync'),
    through2 = require('through2'),
    util     = Brazier.util

class InitController extends Brazier.Controller {

  constructor() {
    super()
  }

  /*
  TODO: provide some validation that this is the project to destroy
  */
  destroy() {

    let cwd = process.cwd()

    sh.run(`rm -rf ${cwd}/*`)

  }

  init(options = {}) {

    this.prompt({
      key: 'appName',
      default: this.cwd.split('/').pop(),
      label: 'App Name'
    })

    var appName = this.store['appName'] = this.rethinkValidName(this.store['appName'])

    //this.createDb(this.store['appName'])

    /*this.promptProperty({
      key: 'authorName',
      default: this.getGitUserName(),
      label: 'Author Name'
    })*/

    var gulpfile = fs.readFileSync(path.join(__dirname, '../../', './template/gulpfile.js'), 'utf8')
    fs.writeFileSync(path.join(process.cwd(), './gulpfile.js'), gulpfile, 'utf8')

    mkdirp.sync(path.join(process.cwd(), './build/sdk'))
    mkdirp.sync(path.join(process.cwd(), './routes'))
    mkdirp.sync(path.join(process.cwd(), './resources/base'))
    mkdirp.sync(path.join(process.cwd(), './sdk/config'))
    mkdirp.sync(path.join(process.cwd(), './sdk/resources'))
    mkdirp.sync(path.join(process.cwd(), './service'))
    mkdirp.sync(path.join(process.cwd(), './test/helpers'))
    mkdirp.sync(path.join(process.cwd(), './test/integration/resources/base'))
    mkdirp.sync(path.join(process.cwd(), './test/sdk/resources'))
    mkdirp.sync(path.join(process.cwd(), './test/unit/resources/base'))

    util.copyFiles({
      destCwd: process.cwd(),
      srcCwd: path.join(__dirname, '../..'),
      files: [
        {
          src:  './template/index.js',
          dest: './index.js'
        },
        {
          data: this.store,
          src:  './template/service/index.js',
          dest: './service/index.js'
        },
        {
          data: this.store,
          src:  './template/lib/config.js',
          dest: './lib/config.js'
        },
        {
          src:  './template/lib/db.js',
          dest: './lib/db.js'
        },
        {
          src:  './template/lib/router.js',
          dest: './lib/router.js'
        },
        {
          src:  './template/resource/base/controller.js',
          dest: './resources/base/controller.js'
        },
        {
          src:  './template/resource/base/model.js',
          dest: './resources/base/model.js'
        },
        {
          src:  './template/resources/ping/routes.js',
          dest: './resources/ping/routes.js'
        },
        {
          src:  './template/sdk/config/api.js',
          dest: './sdk/config/api.js'
        },
        {
          src:  './template/sdk/config/url.js',
          dest: './sdk/config/url.js'
        },
        {
          src:  './template/test/helpers/runner.js',
          dest: './test/helpers/runner.js'
        },
        {
          src:  './template/test/unit/resources/base/controller.js',
          dest: './test/unit/resources/base/controller.js'
        },
        {
          src:  './template/test/unit/resources/base/model.js',
          dest: './test/unit/resources/base/model.js'
        },
        {
          src:  './template/test/integration/resources/base/controller.js',
          dest: './test/integration/resources/base/controller.js'
        },
        {
          src:  './template/test/integration/resources/base/model.js',
          dest: './test/integration/resources/base/model.js'
        }
      ]
    })

    /*
    TODO: move to `thought migrate`
    var db = require(path.join(process.cwd(), './lib/db'))

    db.connect( (err, connection) => {

      r.dbCreate(appName).run(connection, (err, res) => {

        if(err) {

          if(err.toString().indexOf('already exists') > -1) {

            console.log('Database `%s` already exists; skipping creation.', appName)
            return process.exit(0)

          }

          console.error('Error creating database `%s`', err)
          return process.exit(1)

        }

        console.log('Created database `%s`', appName)
        return process.exit(0)

      })

    })
    */

    /*cpr(path.join(__dirname, '../../template/test'), path.join(this.cwd, ), {
      deleteFirst: false, //Delete "to" before
      overwrite: true, //If the file exists, overwrite it
      confirm: true //After the copy, stat all the copied files to make sure they are there
    }, function(err, files) {
      //err - The error if any (err.list might be available with an array of errors for more detailed information)
      //files - List of files that we copied
    })*/

  }

  rethinkValidName(name) {

    return name.replace('-', '_')

  }

}

module.exports = InitController
