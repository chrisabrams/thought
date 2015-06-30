module.exports = (server, options) => {

  server.route('/ping')
    .get( (req, res, next) => {

      res.json({pong: true})

    })

}
