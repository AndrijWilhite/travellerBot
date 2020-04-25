var Discord = require('discord.io')
var logger = require('winston')
var auth = require('./auth.json')
var roll = require('./rolls/dynamicRoll')
var rollCmd = require('./rollCmd')
var coinFlip = require('./rolls/coinFlip')

logger.remove(logger.transports.Console)
logger.add(new logger.transports.Console(), {
  colorize: true
})
logger.level = 'debug'
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
})
bot.on('ready', function (evt) {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(bot.username + ' - (' + bot.id + ')')
})
bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 1) === '!') {
    var args = message.substring(1).split(' ')
    var cmd = args[0].toLowerCase()
    switch (cmd) {
      case 'help':
        let helpMsg = 'To format for a dice roll follow the below examples:\n!1d6 rolls a single six sided dice\n !2d20 rolls two 20 sided dice\n Notes:\n -you can set any amount of sides for the dice\n -the "d" can be lower case or capital\n-large rolls like !999d999 dont work\n-A "!d" will roll a single six sided dice\n-A "!5d will roll 5 D6s"\n- "!coin" flips a coin'
        postMessage(helpMsg, channelID)
        break
      case 'coin':
        let coinMsg = evalUser(user) + ' Flipped: ' + coinFlip()
        postMessage(coinMsg, channelID)
        break
      default:
        let rollMsg = evalUser(user) + ' Rolled: ' + roll(rollCmd(message))
        postMessage(rollMsg, channelID)
        break
    }
  }
})

function postMessage (msg, channelID) {
  bot.sendMessage({
    to: channelID,
    message: msg
  })
}

function evalUser (user) {
  if (user === 'Beskgar') {
    return 'Lord ' + user
  } else if (user === 'johnyatesiv') {
    return 'Poop Face John'
  } else {
    return user
  }
}
