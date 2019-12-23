const range = [
    134564,
    585159
]

const check = (passphrase) => {
  const pass = passphrase.toString().split("")
  let doubles = []
  for(let i=1;i<=pass.length;i++) {
    if(pass[i] < pass[i-1]) {
      return false
    }

    if(pass[i] == pass[i-1]) {
      doubles[pass[i]] = doubles[pass[i]] ? doubles[pass[i]] + 1 : 2
    }
  }

  doubles =  doubles.filter(d => d && d === 2)
  console.log(passphrase, doubles)
  if(doubles.length === 0) {
    return false
  }

  return true
}

const programm = () => {
    return new Promise(resolver => {
      console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${range}`.dim + `\n` + `\n`.bgGray + `\n`);
      let possiblePassphrases = []
      for(let i = range[0];i<=range[1];i++) {
        if(check(i)) {
          possiblePassphrases.push(i)
        }
      }
      console.log(`\n`.bgGray + `\n\n` + `possiblePassphrases: \n\n${possiblePassphrases}`.dim + `\n` + `\n`.bgGray + `\n`);
      return resolver(possiblePassphrases.length)
    }, rejecter => {
      return rejecter("FAIL")
    })
}
module.exports.programm = programm;