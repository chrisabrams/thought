var ResourceController = require('../../../../resources/base/controller')

var res = {
  json: (resp) => {
    return resp
  }
}

describe('ResourceController', function() {

  it('should initialize', function(done) {

    var resourceController = new ResourceController()

    expect(resourceController).to.be.an('object')

    done()

  })

  it('should return a 200 response by default', function(done) {

    var resourceController = new ResourceController()

    var options = {
      err: null,
      pkg: {foo: 'bar'}
    }

    resourceController.response(options, res, (err, resp) => {

      expect(resp).to.be.an('object')
      expect(resp.statusCode).to.be.a('number')
      expect(resp.statusCode).to.equal(200)

      done()

    })

  })

  it('should implicitly return a 400 response when an error is passed', function(done) {

    var resourceController = new ResourceController()

    var options = {
      err: {im: 'an error'}
    }

    resourceController.response(options, res, (err, resp) => {

      expect(resp).to.be.an('object')
      expect(resp.statusCode).to.be.a('number')
      expect(resp.statusCode).to.equal(400)

      done()

    })

  })

  it('should explicitly return a 201 response', function(done) {

    var resourceController = new ResourceController()

    var options = {
      err: null,
      pkg: {foo: 'bar'},
      statusCode: 201
    }

    resourceController.response(options, res, (err, resp) => {

      expect(resp).to.be.an('object')
      expect(resp.statusCode).to.be.a('number')
      expect(resp.statusCode).to.equal(201)

      done()

    })

  })

  it('should explicitly return a 400 response', function(done) {

    var resourceController = new ResourceController()

    var options = {
      err: {foo: 'bar'},
      pkg: null,
      statusCode: 400
    }

    resourceController.response(options, res, (err, resp) => {

      expect(resp).to.be.an('object')
      expect(resp.statusCode).to.be.a('number')
      expect(resp.statusCode).to.equal(400)

      done()

    })

  })

})
