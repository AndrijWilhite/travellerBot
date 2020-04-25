module.exports = function getDices (message) {
  var text = message.substring(1).split(' ')
  var cmd = text[0]

  return parseText(cmd)
}

function parseText (cmd) {
  let reg = /[d]/i
  let info = cmd.split(reg)

  return {
    'dice': (info[0] <= 0 ? 1 : info[0]),
    'sides': (info[1] <= 0 ? 6 : info[1])
  }
}
