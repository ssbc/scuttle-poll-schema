const ssbSchemaDefintions = require('../v1/lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'root', 'details'],
  properties: {
    version: { type: 'string' },
    type: {
      type: 'string',
      pattern: '^position$'
    },
    root: { $ref: '#/definitions/messageId' },
    details: { type: 'object' },
    reason: { type: 'string' },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: ssbSchemaDefintions
}

module.exports = schema
