'use strict'
const merge = require('webpack-merge')
const prodSecrets = require('./prod.secrets')

module.exports = merge(prodSecrets, {
  NODE_ENV: '"production"'
})
