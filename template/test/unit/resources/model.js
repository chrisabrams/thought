var {{resourceName}}Model = require('../../../../resources/{{lowerCase resourceName}}/model')

describe('Unit: {{resourceName}}Model', function() {

  it('should initialize', function(done) {

    var {{instanceName}} = new {{resourceName}}Model()

    expect({{instanceName}}).to.be.an('object')

    done()

  })

})
