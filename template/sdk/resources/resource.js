var Api  = require('../config/api'),
    url  = require('../config/url')

let resourceName = '{{lowerCase resourceName}}'

module.exports = {

  create: (pkg = {}) => {

    return Api.put({
      pkg,
      url: `${url}/${resourceName}`
    })

  },

  deleteById: (pkg = {}) => {

    return Api.delete({
      pkg,
      url: `${url}/${resourceName}/${pkg.id}`
    })

  },

  getById: (pkg = {}) => {

    return Api.get({
      url: `${url}/${resourceName}/${pkg.id}`
    })

  },

  updateById: (pkg = {}) => {

    return Api.post({
      pkg,
      url: `${url}/${resourceName}/${pkg.id}`
    })

  }

}
