module.exports = function evalMsg (msg) {
  if (msg.substring(0, 1) === '!') {
    return msg
  } else {
    let cmd = msg.split('!')
    if (cmd[1]) {
      return '!' + cmd[cmd.length - 1]
    }

    // return cmd
  }
}
