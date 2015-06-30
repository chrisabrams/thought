class ResourceController {

  constructor(options = {}) {



  }

  endpoints(req, res) {

    let endpoint = req.endpoint

    var endpointKey = endpoint

    if(endpoint == 'getOne' || endpoint == 'getAll') {

      endpointKey = 'get'

    }

    this[endpoint](req.body, (err, result) => {

      this.response({
        err: err,
        pkg: result,
        statusCode: this.statusCodes[endpointKey]
      }, res)

    })

  }

  /*
  TODO: this method is a mess
  */
  response(options = {}, res, cb) {

    var statusCode = 200

    var response = {}

    /*
    If a statusCode is provided, then the statusCode is being forced, regardless of what the actual result is.
    */
    if(options.statusCode) {

      switch(options.statusCode) {

        case 201:

          response.pkg = options.pkg
          statusCode   = 201

          break;

        case 400:

          response.err = options.err
          statusCode   = 400

          break;

        /*
        200 is default
        */
        default:

          response.pkg = options.pkg

      }

    }

    /*
    A status code was not explicitly enforced, so draw from logic
    */
    else {

      if(options.err) {

        response.err = options.err
        statusCode   = 400

      }

      else {

        response.pkg = options.pkg
        statusCode   = options.statusCodeSuccess || statusCode

      }

    }

    response.statusCode = statusCode

    res.statusCode = statusCode
    res.json(response)

    if(typeof cb == 'function') {

      cb(response.err, response)

    }

  }

}

module.exports = ResourceController
