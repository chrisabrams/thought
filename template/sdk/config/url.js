var url;

switch(window.env) {

  case 'production':

    break;

  case 'staging':

    break;

  case 'development':

    break;

  default:

    url = 'http://localhost:7000'

}

module.exports = url
