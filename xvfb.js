const os = require('os')
const Promise = require('bluebird')
const Xvfb = require('@cypress/xvfb')
const { stripIndent } = require('common-tags')
const debug = require('debug')('cypress:cli')
const debugXvfb = require('debug')('cypress:xvfb')
const { throwFormErrorText, errors } = require('../errors')
const util = require('../util')

const xvfb = Promise.promisifyAll(new Xvfb({
  timeout: 30000, // milliseconds
  xvfb_args: ['-screen', '0', '1280x1024x24'], // need to explicitly define screen otherwise electron will crash
   onStderrData (data) {
    if (debugXvfb.enabled) {
      debugXvfb(data.toString())
    }
  },
}))
module.exports = {
  _debugXvfb: debugXvfb, // expose for testing
  _xvfb: xvfb, // expose for testing
  start () {
    debug('Starting Xvfb')
    return xvfb.startAsync()
    .return(null)
    .catch({ nonZeroExitCode: true }, throwFormErrorText(errors.nonZeroExitCodeXvfb))
    .catch((err) => {
      if (err.known) {
        throw err
      }
