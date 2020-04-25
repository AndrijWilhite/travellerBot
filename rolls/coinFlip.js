module.exports = function coinFlip () {
  let num = Math.floor(Math.random() * Math.floor(2))
  if (num === 0) {
    return 'Heads'
  } else {
    return 'Tails'
  }
}
