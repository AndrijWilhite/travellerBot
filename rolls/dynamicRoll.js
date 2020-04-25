module.exports = function getDynamicRoll ({ dice, sides }) {
  let results = []
  for (let i = 0; i < dice; i++) {
    results.push(getRandomNumber(sides))
  }
  return results
}

function getRandomNumber (max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}
