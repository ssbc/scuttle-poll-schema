const { CHOOSE_ONE } = require('../../../types')
const typeStringPattern = `^${CHOOSE_ONE}$`

var schema = {
  type: 'object',
  required: ['type', 'choices'],
  properties: {
    type: {
      type: 'string',
      pattern: typeStringPattern
    },
    choices: {
      type: 'array',
      minitems: 1
    }
  }
}

module.exports = schema
