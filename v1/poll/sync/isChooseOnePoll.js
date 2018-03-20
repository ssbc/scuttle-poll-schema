const Validator = require('is-my-json-valid')
const schema = require('../schema/chooseOnePoll')
const validator = Validator(schema, {verbose: true})
const getMsgContent = require('ssb-msg-content')

// server is not used here. Closure pattern is just for consistency of use with other functions.
module.exports = function isChooseOnePoll (obj) {
  const result = validator(getMsgContent(obj))

  // exposes error messages provided by is-my-json-valid
  isChooseOnePoll.errors = validator.errors

  return result
}
