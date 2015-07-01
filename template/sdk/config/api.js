var request = require('superagent')

var API = {

  request: (type, options = {}) => {

    if(!options.pkg) {
      options.pkg = {}
    }

    return new Promise( (resolve, reject) => {

      request[type](options.url)
        .send(options.pkg)
        .set('Accept', 'application/json')
        .end( (err, res) => {

          if(res.body.statusCode == 200 || res.body.statusCode == 201) {
            //console.log('API Response', '->', res.statusCode, '\n', res.body)
            resolve(res.body.pkg)
          }

          else {
            console.log('API Request Error', '->', err)

            reject(res.body.err)
          }

        })

    })

  },

  delete: (options = {}) => {

    return API.request('del', options)

  },

  get: (options = {}) => {

    return API.request('get', options)

  },

  post: (options = {}) => {

    return API.request('post', options)

  },

  put: (options = {}) => {

    return API.request('put', options)

  }

}

module.exports = API
