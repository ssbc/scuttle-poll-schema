const cloneDeep = require('lodash.clonedeep')

const dotDetails = require('./details/dot.js')
const rangeDetails = require('./details/range.js')
const chooseOneDetails = require('./details/chooseOne.js')
const proposalDetails = require('./details/proposal.js')
const meetingTimeDetails = require('./details/meetingTime.js')

const {SCHEMA_VERSION} = require('../../types')

const ssbSchemaDefintions = require('../../lib/ssbSchemaDefintions')

const schema = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['version', 'type', 'title', 'details', 'closesAt'],
  properties: {
    version: {
      type: 'string',
      pattern: `^${SCHEMA_VERSION}$`
    },
    type: {
      type: 'string',
      pattern: '^poll$'
    },
    title: { type: 'string' },
    details: {
      oneOf: [
        { $ref: '#/definitions/details/dot' },
        { $ref: '#/definitions/details/range' },
        { $ref: '#/definitions/details/chooseOne' },
        { $ref: '#/definitions/details/proposal' },
        { $ref: '#/definitions/details/meetingTime' }
        // { $ref: '#/definitions/details/rsvp'},
      ]
    },
    closesAt: { type: 'string', format: 'date-time' },
    body: { type: 'string' },
    progenitor: { $ref: '#/definitions/messageId' },
    mentions: { $ref: '#/definitions/mentions/any' },
    recps: { $ref: '#/definitions/recps' }
  },
  definitions: Object.assign({}, ssbSchemaDefintions, {
    details: {
      type: 'object',
      dot: dotDetails,
      range: rangeDetails,
      chooseOne: chooseOneDetails,
      proposal: proposalDetails,
      meetingTime: meetingTimeDetails
    }
  })
}

module.exports.poll = schema

const chooseOneSchema = cloneDeep(schema)
chooseOneSchema.properties.details = { $ref: '#/definitions/details/chooseOne' }

const dotSchema = cloneDeep(schema)
dotSchema.properties.details = { $ref: '#/definitions/details/dot' }

const meetingTimeSchema = cloneDeep(schema)
meetingTimeSchema.properties.details = { $ref: '#/definitions/details/meetingTime' }

const proposalSchema = cloneDeep(schema)
proposalSchema.properties.details = { $ref: '#/definitions/details/proposal' }

const rangeSchema = cloneDeep(schema)
rangeSchema.properties.details = { $ref: '#/definitions/details/range' }

module.exports.chooseOne = chooseOneSchema
module.exports.dot = dotSchema
module.exports.meetingTime = meetingTimeSchema
module.exports.proposal = proposalSchema
module.exports.range = rangeSchema
