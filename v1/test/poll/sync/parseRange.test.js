const test = require('tape')
const {parseRangePoll: parseRange} = require('../../../poll/sync/parse')
const Validator = require('is-my-json-valid')
const normalisedPollSchema = require('../../../../normalised-schema/poll')

const isNormalisedPoll = Validator(normalisedPollSchema)

test('Poll parsing - parseRange', function (t) {
  const validPoll = parseRange({
    key: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        type: 'poll',
        version: 'v1',
        title: 'how many food',
        details: {
          type: 'range',
          choices: [1, 2, 'three'],
          maxChoiceScore: 5
        },
        closesAt: new Date().toISOString()
      }
    }})
  t.true(isNormalisedPoll(validPoll), 'simple (passes isNormalisedPoll)')

  const invalidPoll = parseRange({
    key: '%t+PhrNxxXkw/jMo6mnwUWfFjJapoPWxzsQoe0Np+nYw=.sha256',
    value: {
      content: {
        type: 'poll',
        // version: 'v1',
        title: 'how many food',
        details: {
          type: 'range',
          choices: [1, 2, 'three'],
          maxChoiceScore: 5
        },
        closesAt: new Date().toISOString()
      }
    }})
  t.equal(invalidPoll, undefined, "doesn't parse invalid poll, returns undefined")
  t.end()
})
