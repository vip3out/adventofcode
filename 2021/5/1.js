const { readInputFileToArray, input_logger } = require('../../helper.js')
const { config, getSeatIds } = require('./helper.js')

const programm = (year, day) => {
    return new Promise(resolver => {
      input_part = 1
      const input_path = `./${year}/${day}/input${input_part}.txt`
      // const input_path = `./${year}/${day}/test.txt`
      readInputFileToArray(input_path, "\n")
        .then(input => {
          
          const seatIds = getSeatIds(input, config)
            .sort((a,b) => a-b)
            .reverse()
          return resolver(seatIds[0])
        })
        .catch(error => {
          throw error;
        })
    }, rejecter => {
        return rejecter("FAIL")
    })
}
module.exports.programm = programm;
