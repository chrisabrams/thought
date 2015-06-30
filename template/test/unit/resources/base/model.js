var ResourceModel = require('../../../../resources/base/model')

describe('Unit: ResourceModel', function() {

  it('should initialize without schema', function(done) {

    var resourceModel = new ResourceModel()

    expect(resourceModel).to.be.an('object')

    done()

  })

  it('should initialize with schema', function(done) {

    var schema = {
      "dateCreated": {
        "default": "now",
        "type": "date"
      },
      "dateUpdated": {
        "default": "now",
        "type": "date"
      },
      "id": {
        "required": true,
        "type": "string"
      },
      "recordStatus": {
        "default": "active",
        "type": "enum",
        "valid": ["active", "deleted"]
      },
      "schemaVersion": {
        "type": "string"
      }
    }

    var resourceModel = new ResourceModel({schema})

    expect(resourceModel).to.be.an('object')

    done()

  })

})
