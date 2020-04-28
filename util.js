module.exports = function evalMsg (msg) {
  if (msg.substring(0, 1) === '!') {
    // return  msg
    console.log('msg')
    console.log(msg)
    return msg
  } else {
    let cmd = msg.split('!')
    if (cmd[1]) {
      console.log('cmd')
      console.log(cmd)
      return '!' + cmd[cmd.length - 1]
    }

    // return cmd
  }
}
