const Position = require('./position')
const { CHOOSE_ONE } = require('../../types')

module.exports = function ChooseOne ({ poll, choice, reason, channel, mentions }) {
  return Position({
    poll,
    details: {
      type: CHOOSE_ONE,
      choice
    },
    reason,
    channel,
    mentions
  })
}
