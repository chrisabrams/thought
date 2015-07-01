var ResourceController = require('../../../../resources/base/controller')

describe('Unit: Resource Controller', function() {

  it('should initialize', function(done) {

    var resourceController = new ResourceController()

    expect(resourceController).to.be.an('object')

    done()

  })

})
