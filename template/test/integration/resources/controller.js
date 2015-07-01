var {{resourceName}}Controller = require('../../../../resources/{{lowerCase resourceName}}/controller'),
    {{resourceName}}Model      = require('../../../../resources/{{lowerCase resourceName}}/model')

var res = {
  statusCode: null
}

res.json = (response) => {
  return response
}

describe('Integration: {{resourceName}} Controller', function() {

  beforeEach( (done) => {

    res.statusCode = null

    done()

  })

  it('should create a {{instanceName}}', function(done) {

    var {{instanceName}}Controller = new {{resourceName}}Controller()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    var req = {
      body: pkg
    }

    {{instanceName}}Controller.create(req, res, (err, resp) => {

      expect(resp).to.be.an('object')
      expect(resp.pkg).to.be.an('object')
      expect(resp.pkg.id).to.be.a('string')
      expect(resp.pkg.firstName).to.be.a('string')
      expect(resp.pkg.firstName).to.equal(pkg.firstName)
      expect(resp.pkg.lastName).to.be.a('string')
      expect(resp.pkg.lastName).to.equal(pkg.lastName)

      done()

    })

  })

  it('should get one {{instanceName}} by ID', function(done) {

    var {{instanceName}}Controller = new {{resourceName}}Controller(),
        {{instanceName}}Model      = new {{resourceName}}Model()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    var req = {
      body: pkg
    }

    {{instanceName}}Controller.create(req, res, (err, resp) => {

      {{instanceName}}Model.getById(resp.pkg.id, (err, resp) => {

        expect(resp).to.be.an('object')
        expect(resp.firstName).to.be.a('string')
        expect(resp.firstName).to.equal(pkg.firstName)
        expect(resp.lastName).to.be.a('string')
        expect(resp.lastName).to.equal(pkg.lastName)

        done()

      })

    })

  })

  it('should update one {{instanceName}} by ID', function(done) {

    var {{instanceName}}Controller = new {{resourceName}}Controller(),
        {{instanceName}}Model      = new {{resourceName}}Model()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    let pkg2 = {
      lastName: 'Foofoo'
    }

    var req = {
      body: pkg
    }

    /*
    TODO: change controller create to model create, then do controller update
    */
    {{instanceName}}Controller.create(req, res, (err, resp) => {

      {{instanceName}}Model.updateById(resp.pkg.id, pkg2, (err, resp) => {

        expect(resp).to.be.an('object')
        expect(resp.firstName).to.be.a('string')
        expect(resp.firstName).to.equal(pkg.firstName)
        expect(resp.lastName).to.be.a('string')
        expect(resp.lastName).to.equal(pkg2.lastName)

        done()

      })

    })

  })

  it('should delete one {{instanceName}} by ID', function(done) {

    var {{instanceName}}Controller = new {{resourceName}}Controller(),
        {{instanceName}}Model      = new {{resourceName}}Model()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    var req = {
      body: pkg
    }

    {{instanceName}}Controller.create(req, res, (err, resp) => {

      {{instanceName}}Model.deleteById(resp.pkg.id, (err, resp) => {

        expect(resp).to.be.an('object')
        expect(resp.recordStatus).to.be.a('string')
        expect(resp.recordStatus).to.equal('deleted')

        done()

      })

    })

  })

})
