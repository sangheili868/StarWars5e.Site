'use strict'
const merge = require('webpack-merge')
const devSecrets = require('./dev.secrets')

module.exports = merge(devSecrets, {
  NODE_ENV: '"development"'
})
