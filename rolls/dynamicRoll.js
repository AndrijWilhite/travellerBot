module.exports = function getDynamicRoll ({ dice, sides, mod, modType, difficulty }) {

  const reducer = (accumulator, currentValue) => accumulator + currentValue

  let results = []
  for (let i = 0; i < dice; i++) {
    results.push(getRandomNumber(sides))
  }

  const sum = results.reduce(reducer, parseInt(modType === '-' ? -Math.abs(mod) : mod))

  if (difficulty !== undefined) {
    let status = rollDifficulty(sum, difficulty)
    return { 'data': results, 'sum': sum, 'status': status }
  } else {
    return { 'data': results.length > 100 ? 'to much to display' : results, 'sum': sum }
  }
}

function getRandomNumber (max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}

function rollDifficulty (sum, diff) {
  if (sum >= diff) {
    return 'Pass'
  } else {
    return 'Fail'
  }
}
