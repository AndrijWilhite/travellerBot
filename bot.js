var Discord = require('discord.io')
var logger = require('winston')
var auth = require('./auth.json')

var roll = require('./rolls/dynamicRoll')
var rollCmd = require('./rollCmd')
var coinFlip = require('./rolls/coinFlip')
var nameMap = require('./charName.json')
var text = require('./text.js')
var digiQuote = require('./digiQuote.js')
var evalMsg = require('./util.js')

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
  let msgCheck = evalMsg(message)
    // console.log('msgCheck: ' + msgCheck)
    // if (message.substring(0, 1) === '!') {
  if (msgCheck) {
    var args = message.substring(1).split(' ')
    var cmd = args[0].toLowerCase()
    // switch (cmd) {
        switch (msgCheck){
      case 'help':
        postMessage(text.helper, channelID)
        break
      case 'coin':
        let coinMsg = evalUser(user) + ' Flipped: ' + coinFlip()
        postMessage(coinMsg, channelID)
        break
      case 'digi':
        let digiMsg = evalUser(user) + ' Says: ' + digiQuote()
        postMessage(digiMsg, channelID)
        break
      default:
        let rollData = roll(rollCmd(msgCheck))
        if (rollData.status) {
          var rollMsg = evalUser(user) + ' Rolled: ' + rollData.data + ' Result: ' + rollData.status
        } else {
          var rollMsg = evalUser(user) + ' Rolled: ' + rollData.data
        }
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
  if (nameMap[user]) {
    return nameMap[user]
  } else {
    return user
  }
}
