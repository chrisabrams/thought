var Joi = require('joi'),
    r   = require('rethinkdb')

class ResourceModel {

  constructor(options = {}) {

    this.translateSchema(options.schema)

  }

  /*
  TODO: instead of failing silently, provide developer feedback
  */
  schemaDefault(key, schema, schemaItem, schemaItemType) {

    let schemaKey = schema[key]

    if(typeof schemaKey.default == schemaItemType) {

      var defaultValue = null

      if(schemaItemType == 'date') {

        defaultValue = r.now()

      }

      else {

        defaultValue = schemaKey.default()

      }

      schemaItem = schemaItem.default(defaultValue)

    }

    return schemaItem

  }

  translateSchema(schema) {

    if(!schema) return

    var translatedSchema = {}

    Object.keys(schema).forEach( (key) => {

      let schemaKey = schema[key]

      var schemaItemType = schemaKey.type
      if(schemaItemType == 'enum') schemaItemType = 'any'

      var schemaItem = Joi[schemaItemType]()

      // If a default is supplied, then set the default
      schemaItem     = this.schemaDefault(key, schema, schemaItem, schemaItemType)

      switch(schema[key].type) {

        case 'enum':

          schemaItem = schemaItem.valid(schemaKey.valid)

          break;

        case 'number':

          break;

        case 'string':

          break;

        // any type
        default:

          schemaItem = Joi.any()

      }

      if(schema[key].required) {

        schemaItem = schemaItem.required()

      }

      translatedSchema[key] = schemaItem

    })

    this.schema = translatedSchema

  }

}

module.exports = ResourceModel
