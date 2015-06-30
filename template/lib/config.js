var Config = {}

Config.db   = process.env.RETHINK_DB   || '{{appName}}'
Config.host = process.env.RETHINK_HOST || 'localhost'
Config.port = parseInt(process.env.RETHINK_PORT) || 28015

module.exports = Config
