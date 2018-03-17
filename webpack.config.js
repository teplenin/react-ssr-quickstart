'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config/webpack/prod')
} else {
  module.exports = require('./config/webpack/dev')
}
