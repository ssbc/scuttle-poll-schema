const getContent = require('ssb-msg-content')
const {SCHEMA_VERSION} = require('../../types')

function Poll (msg) {
  var { details, title, closesAt, body, channel, recps, mentions } = getContent(msg)
  closesAt = new Date(closesAt)
  var content = { type: 'poll', details, title, closesAt, version: SCHEMA_VERSION }

  if (body) content.body = body

  // if (root) {
  //   root = link(root)
  //   if (!root) { throw new Error('root is not a valid link') }
  //   content.root = root
  // }
  // if (branch) {
  //   if (!root) { throw new Error('root is not a valid link') }
  //   branch = Array.isArray(branch) ? branch.map(link) : link(branch)
  //   if (!branch) { throw new Error('branch is not a valid link') }
  //   content.branch = branch
  // }
  //
  // // NOTE mentions can be derived from text,
  // // or we could leave it so you can manually notify people without having to at-mention spam the text
  // if (mentions && (!Array.isArray(mentions) || mentions.length)) {
  //   mentions = links(mentions)
  //   if (!mentions || !mentions.length) { throw new Error('mentions are not valid links') }
  //   content.mentions = mentions
  // }
  // if (recps && (!Array.isArray(recps) || recps.length)) {
  //   recps = links(recps)
  //   if (!recps || !recps.length) { throw new Error('recps are not valid links') }
  //   content.recps = recps
  // }
  if (channel) {
    if (typeof channel !== 'string') { throw new Error('channel must be a string') }
    content.channel = channel
  }

  return content
}

module.exports = Poll
