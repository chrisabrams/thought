var {{resourceName}}Model = require('../../../../resources/{{lowerCase resourceName}}/model')

describe('Integration: {{resourceName}}Model', function() {

  it('should create a {{instanceName}}', function(done) {

    var {{instanceName}} = new {{resourceName}}Model()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    {{instanceName}}.create(pkg, (err, res) => {

      expect(res).to.be.an('object')
      expect(res.id).to.be.a('string')
      expect(res.firstName).to.be.a('string')
      expect(res.firstName).to.equal(pkg.firstName)
      expect(res.lastName).to.be.a('string')
      expect(res.lastName).to.equal(pkg.lastName)

      done()

    })

  })

  /*
  TODO: figure out the syntax for getting all records
  */
  it.skip('should get all {{lowerCase resourceName}}', function(done) {

    var {{instanceName}} = new {{resourceName}}Model()

    {{instanceName}}.getAll( (err, res) => {

      console.error(err)
      console.error(res)

      expect(res).to.be.an('object')

      done()

    })

  })

  it('should get one {{instanceName}} by ID', function(done) {

    var {{instanceName}} = new {{resourceName}}Model()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    {{instanceName}}.create(pkg, (err, res) => {

      {{instanceName}}.getById(res.id, (err, resp) => {

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

    var {{instanceName}} = new {{resourceName}}Model()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    let pkg2 = {
      lastName: 'Foofoo'
    }

    {{instanceName}}.create(pkg, (err, res) => {

      {{instanceName}}.updateById(res.id, pkg2, (err, resp) => {

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

    var {{instanceName}} = new {{resourceName}}Model()

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    {{instanceName}}.create(pkg, (err, res) => {

      {{instanceName}}.deleteById(res.id, (err, resp) => {

        expect(resp).to.be.an('object')
        expect(resp.recordStatus).to.be.a('string')
        expect(resp.recordStatus).to.equal('deleted')

        done()

      })

    })

  })

})
