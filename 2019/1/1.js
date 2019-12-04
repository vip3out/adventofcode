const { readInputFileToArray } = require('../../helper.js')

const programm = () => {
    return new Promise(resolver => {
      readInputFileToArray('./2019/1/input1.txt', "\n", "int")
        .then(input => {
          console.log(`\n`.bgGray + `\n\n` + `INPUT: \n\n${input}`.dim + `\n` + `\n`.bgGray + `\n`);
          return resolver(input.reduce((prev, curr) => {
            return prev + (Math.floor(curr / 3) - 2)
          }, 0))
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;