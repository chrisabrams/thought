var acorn             = require('acorn'),
    Brazier           = require('brazier'),
    fs                = require('fs'),
    Handlebars        = require('handlebars'),
    mkdirp            = require('mkdirp'),
    path              = require('path'),
    util              = Brazier.util

/*
@class GenerateController
@extends Brazier.Controller
*/
class GenerateController extends Brazier.Controller {

  constructor() {
    super()

    this.appPath           = path.join(this.cwd)
    this.resourcePath      = path.join(this.cwd, `./resources`)
    this.testPath          = path.join(this.cwd, `./test`)
    this.templatePath      = path.join(__dirname, '../../template')
  }

  destroy() {



  }

  docs() {

    var parsed = acorn.parse(fs.readFileSync(__filename, 'utf8'), {
      ecmaVersion: 6,
      sourceType: 'module'
    })

  }

  generate(key, options = {}, cb) {

    // Make sure that test directories exist
    mkdirp.sync(path.join(`${this.testPath}/unit/resources/${key}`))
    mkdirp.sync(path.join(`${this.testPath}/integration/resources/${key}`))

    this.generateController(key)
    this.generateModel(key)
    this.generateSchema(key)
    this.generateRoutes(key)
    this.generateSdkItem(key)

    //this.createTable(key, {primaryKey: 'id'}, cb)

    /*var db = require(path.join(process.cwd(), './lib/db'))

    db.connect( (err, connection) => {

      r.tableCreate(key).run(connection, (err, res) => {

        if(err) {

          if(err.toString().indexOf('already exists') > -1) {

            console.log('Table `%s` already exists; skipping creation.', key)
            return process.exit(0)

          }

          console.error('Error creating table `%s`', err)
          return process.exit(1)

        }

        console.log('Created table `%s`', key)
        return process.exit(0)

      })

    })*/

  }

  generateController(key) {

    mkdirp.sync(this.resourcePath)

    let instanceName = util.singularCase(key),
        resourceName = util.upperCaseFirstLetter(key)

    util.copyFiles([
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.resourcePath}/${key}/controller.js`,
        src: `${this.templatePath}/resource/controller.js`
      },
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.testPath}/unit/resources/${key}/controller.js`,
        src: `${this.templatePath}/test/unit/resources/controller.js`
      },
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.testPath}/integration/resources/${key}/controller.js`,
        src: `${this.templatePath}/test/integration/resources/controller.js`
      }
    ])

  }

  generateModel(key) {

    mkdirp.sync(this.resourcePath)

    let instanceName = util.singularCase(key),
        resourceName = util.upperCaseFirstLetter(key)

    util.copyFiles([
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.resourcePath}/${key}/model.js`,
        src: `${this.templatePath}/resource/model.js`
      },
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.testPath}/unit/resources/${key}/model.js`,
        src: `${this.templatePath}/test/unit/resources/model.js`
      },
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.testPath}/integration/resources/${key}/model.js`,
        src: `${this.templatePath}/test/integration/resources/model.js`
      }
    ])

  }

  generateRoutes(key) {

    var routeTemplate = Handlebars.compile(fs.readFileSync(path.join(this.templatePath, `./resource/routes.js`), 'utf8'))

    fs.writeFileSync(`${this.resourcePath}/${key}/routes.js`, routeTemplate({resourceName: key}), 'utf8')

  }

  generateSchema(key) {

    if(typeof this.store.schema != 'object') return

    var defaultSchema = require(path.join(__dirname, '../../template/resource/schema.json'))

    var schema = (Object.assign(this.store.schema, defaultSchema))

    fs.writeFileSync(path.join(this.cwd, `./resources/${key}/schema.json`), JSON.stringify(schema, null, 2), 'utf8')

  }

  generateSdkItem(key) {

    let instanceName = util.singularCase(key),
        resourceName = util.upperCaseFirstLetter(key)

    util.copyFiles([
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.appPath}/sdk/resources/${key}.js`,
        src: `${this.templatePath}/sdk/resources/resource.js`
      },
      {
        data: {
          instanceName,
          resourceName
        },
        dest: `${this.appPath}/test/sdk/resources/${key}.js`,
        src: `${this.templatePath}/test/sdk/resources/resource.js`
      }
    ])

  }

  resource(options = {}) {

    this.prompt({
      key: 'resourceName',
      default: 'users',
      label: 'Resource Name in plural'
    })

    // Start over as a valid resource name is required
    if(this.isStringEmpty(this.store.resourceName)) {
      return this.resource(options)
    }

    this.defineSchemaProperty()

    this.generate(this.store['resourceName'])

  }

  defineSchemaProperty() {

    this.store.schema = this.store.schema || {}

    this.prompt({
      key: 'defineSchema',
      default: 'Y',
      label: '\nDefine a schema property? [Y/n]',
      valueAsBoolean: true
    })

    if(this.store['defineSchema'] === true) {

      this.prompt({
        key: 'schemaPropertyName',
        default: '',
        label: 'Property name'
      })

      var schemaProperty = this.store.schema[this.store['schemaPropertyName']] = {}

      this.prompt({
        key: 'schemaPropertyType',
        default: 'string',
        label: 'Type: string, number, boolean, date, enum'
      })

      /*
      TODO: Find a way to reference the prompt values to use for later, such as prompt type
      */
      var type

      if(this.isStringEmpty(this.store['schemaPropertyType'])) {
        type = 'string'
      }

      else {

        type = this.store['schemaPropertyType']

      }

      schemaProperty.type = type

      this.prompt({
        key: 'schemaPropertyDefault',
        default: '',
        label: 'Default value (leave blank for none)'
      })

      if(this.store['schemaPropertyDefault'] != '') {

        schemaProperty.value = this.store['schemaPropertyDefault']

      }

      this.prompt({
        key: 'schemaPropertyRequired',
        default: 'N',
        label: 'Required? [y/N]',
        valueAsBoolean: true
      })

      if(this.store['schemaPropertyRequired']) {

        schemaProperty.required = true

      }

      this.defineSchemaProperty()

    }

  }

}

module.exports = GenerateController
