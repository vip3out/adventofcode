const { readInputFileToArray } = require('../../helper.js')
const { IntcodeProgramm } = require('../../intcode.js')

const programm = () => {
    return new Promise(resolver => {
      readInputFileToArray('./2019/2/input1.txt', ",", 'int')
        .then(input => {
          console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${input}`.dim + `\n` + `\n`.bgGray + `\n`);
          for(let i = 0;i<=99;i++) {
            for(let z = 0;z<=99;z++) {
              const intcodeProgramm = new IntcodeProgramm(input)
              intcodeProgramm.run(i, z)
              if(intcodeProgramm.value === 19690720) {
                return resolver(100 * i + z)
              }
            }
          }

          resolver("nix");
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;