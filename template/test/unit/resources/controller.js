var {{resourceName}}Controller = require('../../../../resources/{{lowerCase resourceName}}/controller'),
    {{resourceName}}Model      = require('../../../../resources/{{lowerCase resourceName}}/model')

describe('Unit: {{resourceName}}Controller', function() {

  it('should initialize', function(done) {

    var {{instanceName}}Controller = new {{resourceName}}Controller()

    expect({{instanceName}}Controller).to.be.an('object')

    done()

  })

})
