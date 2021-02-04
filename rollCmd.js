const Dice = require('dice-notation-js');

module.exports = function getDices (message) {
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
  let hasPlus = cmd.includes('+')
  let mod = cmd.split(/[\+\-]/g)

  let reg = /[d]/i
  let info = mod[0].split(reg)

  return {
    'dice': (info[0] <= 0 ? 1 : info[0]),
    'sides': (info[1] <= 0 ? 6 : info[1]),
    'mod': mod[1] || 0,
    'modType': hasPlus ? '+' : '-',
    'difficulty': diff
  }
}
