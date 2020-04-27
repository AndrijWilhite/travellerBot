module.exports = function getDynamicRoll ({ dice, sides, difficulty }) {
  let results = []
  console.log(difficulty)
  for (let i = 0; i < dice; i++) {
    results.push(getRandomNumber(sides))
  }

  if (difficulty !== undefined) {
    console.log('check')
    let status = rollDifficulty(results, difficulty)
    return { 'data': results, 'status': status }
  } else {
    return { 'data': results }
  }

  // return results
}

function getRandomNumber (max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1
}

function rollDifficulty (results, diff) {
  let total = 0
  results.forEach(roll => {
    total += roll
  })

  if (total >= diff) {
    return 'Pass'
  } else {
    return 'Fail'
  }
}
