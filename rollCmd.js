module.exports = function getDices (message) {
  console.log('on ROlls CMD: ' + message)
  var text = message.substring(1).split(' ')
  var cmd = text[0]
  var difficulty = require('./minEffect')

  if (text[1]) {
    if (difficulty[text[1].toLowerCase()]) {
      return parseText(cmd, difficulty[text[1]])
    } else {
      return parseText(cmd)
    }
  } else {
    return parseText(cmd)
  }
}

function parseText (cmd, diff) {
  let reg = /[d]/i
  let info = cmd.split(reg)

  return {
    'dice': (info[0] <= 0 ? 1 : info[0]),
    'sides': (info[1] <= 0 ? 6 : info[1]),
    'difficulty': diff
  }
}
