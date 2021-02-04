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
//   let msgCheck = evalMsg(message)
    if (message.substring(0, 1) === '!') {
    var args = message.substring(1).split(' ')
    var cmd = args[0].toLowerCase()
    switch (cmd) {
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
      case 'joke':
        postMessage('YOU!', channelID)
        break
      case 'pidpi':
        postMessage('no', channelID)
        break
      case 'test':
        // let digiMsgT = evalUser(user) + ' Says:' + digiQuote()
        let a = 'https://giphy.com/gifs/fox-nintendo-ZQMVKzoTLdNBu'
        postMessage(a, channelID, false)
        break
      case 'link':
        postMessage('https://docs.google.com/spreadsheets/d/1JCAkEn4t0fm5Kca6Rh7jzbU2rgEp4X1yP5PzoEXBQrs/edit#gid=0 \n https://thetrove.is/reader.html?file=https%3A%2F%2Fthetrove.is%2FBooks%2FTraveller%2F08%2520-%2520Traveller%2520%2528Mongoose%2529%2FTraveller%2520-%2520Supplement%2520%252304%2520-%2520Central%2520Supply%2520Catalog%2520%2528mgp3819%2529.pdf \n https://thetrove.is/reader.html?file=https%3A%2F%2Fthetrove.is%2FBooks%2FTraveller%2F10%2520-%2520Traveller%25202nd%2520edition%2520%2528Mongoose%2529%2FMgT%25202E%2520-%2520Core%2520Rulebook.pdf ',channelID)
        break
      default:
        let rollData = roll(rollCmd(message))
        if (rollData.status) {
          var rollMsg = evalUser(user) + ' Rolled: `' + rollData.data + '` = ' + rollData.sum + ' Result: ' + rollData.status
        } else {
          var rollMsg = evalUser(user) + ' Rolled: `' + rollData.data + '` = ' + rollData.sum
        }
        postMessage(rollMsg, channelID)
        break
    }
  }
})

function postMessage (msg, channelID, voice) {
  bot.sendMessage({
    to: channelID,
    message: msg,
    tts: voice
  })
}

function evalUser (user) {
  if (nameMap[user]) {
    return nameMap[user]
  } else {
    return user
  }
}

process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
})
