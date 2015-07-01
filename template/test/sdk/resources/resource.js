var resource = require('../../../sdk/resources/{{lowerCase resourceName}}')

describe('SDK: {{resourceName}} Resource', function() {

  it('should be an object', function(done) {

    expect(resource).to.be.an('object')

    done()

  })

  it('should create a {{instanceName}}', function(done) {

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    resource
      .create(pkg)
      .then( (resp) => {

        expect(resp).to.be.an('object')
        expect(resp.firstName).to.be.a('string')
        expect(resp.id).to.be.a('string')
        expect(resp.lastName).to.be.a('string')

        done()

      })

  })

  it('should get one {{instanceName}} by ID', function(done) {

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    resource
      .create(pkg)
      .then( (resp) => {

        resource
          .getById({
            id: resp.id
          })
          .then( (resp2) => {

            expect(resp2).to.be.an('object')
            expect(resp2.firstName).to.be.a('string')
            expect(resp2.id).to.be.a('string')
            expect(resp2.lastName).to.be.a('string')

            done()

          })

      })

  })

  it('should update one {{instanceName}} by ID', function(done) {

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    var pkg2 = {
      lastName: 'Foo'
    }

    resource
      .create(pkg)
      .then( (resp) => {

        pkg2.id = resp.id

        resource
          .updateById(pkg2)
          .then( (resp2) => {

            expect(resp2).to.be.an('object')
            expect(resp2.firstName).to.be.a('string')
            expect(resp2.id).to.be.a('string')
            expect(resp2.lastName).to.be.a('string')

            done()

          })

      })

  })

  it('should delete one {{instanceName}} by ID', function(done) {

    let pkg = {
      firstName: 'Chris',
      lastName: 'Abrams'
    }

    resource
      .create(pkg)
      .then( (resp) => {

        resource
          .deleteById({
            id: resp.id
          })
          .then( (resp2) => {

            expect(resp2).to.be.an('object')
            expect(resp2.recordStatus).to.be.a('string')
            expect(resp2.recordStatus).to.equal('deleted')

            done()

          })

      })

  })

})
