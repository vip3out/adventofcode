const { readInputFileToArray } = require('../../helper.js')
const { IntcodeProgramm } = require('../../intcode.js')

const programm = () => {
    return new Promise(resolver => {
      readInputFileToArray('./2019/2/input1.txt', ",", 'int')
        .then(input => {
          const intcodeProgramm = new IntcodeProgramm(input)
          intcodeProgramm.run(12, 2)
          return resolver(intcodeProgramm.value)
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;