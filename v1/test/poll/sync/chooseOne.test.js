const test = require('tape')
const ChooseOne = require('../../../poll/sync/chooseOne')
const isPoll = require('../../../isPoll')

test('Position - ChooseOne', function (t) {
  var invalidPoll = ChooseOne({
  })
  t.false(isPoll(invalidPoll), 'invalid')

  var validPoll = ChooseOne({
    title: 'how many food',
    choices: [1, 2, 'three'],
    closesAt: new Date().toISOString()
  })
  t.true(isPoll(validPoll), 'simple (passes isPoll)')
  t.true(isPoll.chooseOne(validPoll), 'simple (passes isPoll.chooseOne)')

  var fullPollMsg = {
    key: '%somekey',
    value: {
      content: validPoll
    }
  }
  t.true(isPoll(fullPollMsg), 'simple (full msg)')
  // NOTE - we might want an isChooseOnePoll in future
  // t.true(isChooseOnePoll(fullPollMsg), 'simple (full msg)')

  t.end()
})
